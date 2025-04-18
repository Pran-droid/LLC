import express from "express";
import Schedule from "../models/schedule.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const schedules = [
            {
                day: 18,
                month: 4,
                year: 2025,
                events: [
                  {
                    title: "LLC01 | Venue-Student Kitchen",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC03 | Venue-207",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC04 | Venue-108",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC08 | Venue-401",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC015 | Venue-506",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC019 | Venue-401",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC021 | Venue-808",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC025 | Venue-507",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC026 | Venue-804",
                    time: "08:45 AM - 10:45 AM"
                  }
                ]
            },
            {
              day: 19,
              month: 4,
              year: 2025,
              events: [
                {
                  title: "LLC05 | Venue-Samvaad",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC06 | Venue-502",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC07    | Venue-108",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC08 | Venue-401",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC016 | Venue-506",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC019 | Venue-401",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC023 | Venue-503",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC025 | Venue-507",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC026 | Venue-804",
                  time: "08:45 AM - 10:45 AM"
                }
              ]
            },
            {
                day: 25,
                month: 4,
                year: 2025,
                events: [
                  {
                    title: "LLC01 | Venue-Student Kitchen",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC03 | Venue-207",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC04 | Venue-108",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC08 | Venue-401",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC015 | Venue-506",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC019 | Venue-401",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC021 | Venue-808",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC025 | Venue-507",
                    time: "08:45 AM - 10:45 AM"
                  },
                  {
                    title: "LLC026 | Venue-804",
                    time: "08:45 AM - 10:45 AM"
                  }
                ]
            },
            {
              day: 26,
              month: 4,
              year: 2025,
              events: [
                {
                  title: "LLC05 | Venue-Samvaad",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC06 | Venue-502",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC07    | Venue-108",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC08 | Venue-401",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC016 | Venue-506",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC019 | Venue-401",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC023 | Venue-503",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC025 | Venue-507",
                  time: "08:45 AM - 10:45 AM"
                },
                {
                  title: "LLC026 | Venue-804",
                  time: "08:45 AM - 10:45 AM"
                }
              ]
            }
          ];
        
        res.status(200).json({
            success: true, 
            data: schedules,
            count: schedules.length
        });
    } catch (error) {
        console.error('Schedule fetch error:', error);
        res.status(500).json({
            success: false, 
            message: 'Server error',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    const { day, month, year, events } = req.body;
    
    // Validate required fields
    if (!day || !month || !year || !events || !Array.isArray(events)) {
        return res.status(400).json({
            success: false, 
            message: 'Please provide valid day, month, year and events array'
        });
    }

    // Validate events array structure
    const validEvents = events.every(event => 
        event.title && 
        typeof event.title === 'string' && 
        event.time && 
        typeof event.time === 'string'
    );

    if (!validEvents) {
        return res.status(400).json({
            success: false,
            message: 'Each event must have a title and time as strings'
        });
    }

    try {
        // Check for existing schedule on same date
        const existingSchedule = await Schedule.findOne({ day, month, year });
        if (existingSchedule) {
            return res.status(400).json({
                success: false,
                message: 'Schedule already exists for this date'
            });
        }

        const newSchedule = new Schedule({
            day,
            month,
            year,
            events
        });

        await newSchedule.save();
        res.status(201).json({
            success: true,
            message: 'Schedule created successfully',
            data: newSchedule
        });
    } catch (error) {
        console.error('Schedule creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

export default router;

