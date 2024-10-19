import { Timetable } from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok, Err } from "ts-results";
import { AccountService } from ".";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alerttimetable@gmail.com",
    pass: "ttrt bryy halz uqys",
  },
});


export const createTimetable = async (
  email: string,
  name: string,
  scheduledEventIds: string[],
): Promise<Result<Timetable, Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const mailOptions = {
    from: "alerttimetable@gmail.com",
    to: account.email,
    subject: "Notification for Succesful Registration",
    text: "This is a notification from carleton, to inform you that you have just made a timetable!",
  };

  const scheduledEvents = await prisma.scheduledEvent.findMany({
    where: {
      id: {
        in: scheduledEventIds.map((id) => parseInt(id)),
      },
    },
  });

  for (let i = 0; i < scheduledEvents.length; i++) {
    for (let j = i + 1; j < scheduledEvents.length; j++) {
      const eventA = scheduledEvents[i];
      const eventB = scheduledEvents[j];

      
      if (
        (eventA.startTime < eventB.endTime && eventA.endTime > eventB.startTime) ||
        (eventB.startTime < eventA.endTime && eventB.endTime > eventA.startTime)
      ) {
        return Err(new Error("Events overlap"));
      }
    }
  }


  const timetable = await prisma.timetable.create({
    data: {
      name,
      account: {
        connect: {
          id: account.id,
        },
      },
      timetableEvents: {
        create: scheduledEventIds.map((id) => ({
          scheduledEvent: {
            connect: {
              id: parseInt(id),
            },
          },
        })),
      },
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  return Ok(timetable);
};

export const getTimetableById = async (
  id: number,
): Promise<Result<Timetable, Error>> => {
  const timetable = await prisma.timetable.findUnique({
    where: {
      id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (timetable === null) {
    return Err(new Error("Timetable not found"));
  }

  return Ok(timetable);
};

export const getAccountTimetables = async (
  email: string,
): Promise<Result<Timetable[], Error>> => {
  const account = await AccountService.findByEmail(email);

  if (account === null) {
    return Err(new Error("Account not found"));
  }

  const timetables = await prisma.timetable.findMany({
    where: {
      accountId: account.id,
    },
    include: {
      timetableEvents: {
        include: {
          scheduledEvent: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  return Ok(timetables);
};
