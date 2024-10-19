import { Timetable, Account} from "@prisma/client";
import { prisma } from "../db";
import { Result, Ok, Err } from "ts-results";
import { AccountService } from ".";
import fs from 'fs';
import path from 'path';

const cron = require('node-cron');


const generateReport = async (): Promise<Result<string, Error>> => {
    try {
        const studentsWithTimetables = await prisma.account.findMany({
            where: {
                timetables: {
                    some: {}, 
                },
            },
            select: {
                id: true,
                email: true, 
                // name: true, 
            },
        });

        const reportContent = studentsWithTimetables.map(student => 
            `ID: ${student.id}, Email: ${student.email}`
        ).join('\n');

        const filePath = path.join(__dirname, 'reports', `report-${new Date().toISOString()}.txt`);
        fs.writeFileSync(filePath, reportContent);

        return Ok(`Report generated successfully at ${filePath}`);
    } catch (error) {
        return Err(new Error(`Failed to generate report: ${error.message}`));
    }
};


cron.schedule('*/30 * * * * *', async () => {
    const result = await generateReport();
    if (result.err) {
        console.error(result.val.message);
    } else {
        console.log(result.val);
    }
});