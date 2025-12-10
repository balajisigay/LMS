USE lmsdb;

-- Insert sample instructors
INSERT INTO Instructors (Name, Title, Rating, Students, Courses, Bio, ImageUrl, CreatedAt) VALUES
('Sarah Johnson', 'Python Expert', 4.8, 15420, 5, 'Experienced Python developer with 10+ years in software development', 'https://api.example.com/instructor1.jpg', NOW()),
('Mike Chen', 'Full Stack Developer', 4.9, 18500, 6, 'Full stack specialist focusing on modern web technologies', 'https://api.example.com/instructor2.jpg', NOW()),
('Emma Davis', 'Data Science Pro', 4.7, 12300, 4, 'Data scientist passionate about machine learning and AI', 'https://api.example.com/instructor3.jpg', NOW()),
('John Wilson', 'Web Development', 4.6, 9800, 3, 'Web developer specializing in React and Node.js', 'https://api.example.com/instructor4.jpg', NOW());

-- Insert sample courses
INSERT INTO Courses (Title, Description, Category, Subcategory, Price, OriginalPrice, Discount, Badge, Rating, ReviewCount, StudentCount, InstructorId, ImageUrl, WhatYouLearn, Includes, Companies, CreatedAt, UpdatedAt) VALUES
('Complete Python Programming', 'Learn Python from basics to advanced OOP concepts', 'Development', 'Python', 19.99, 99.99, 80, 'BESTSELLER', 4.8, 3245, 45230, 1, 'https://api.example.com/python-course.jpg', 'Python Basics;OOP Concepts;Web Scraping;Data Analysis;Automation', '50 hours video;30 coding exercises;Downloadable resources;Lifetime access;Certificate', 'Google;Amazon;Microsoft;Facebook', NOW(), NOW()),
('React for Beginners', 'Master React and build modern web applications', 'Development', 'React', 29.99, 149.99, 80, 'NEW', 4.9, 1856, 28900, 4, 'https://api.example.com/react-course.jpg', 'React Fundamentals;Hooks;State Management;Routing;API Integration', '40 hours video;20 projects;Code samples;Community support;Certificate', 'Netflix;Airbnb;Uber;PayPal', NOW(), NOW()),
('Data Science Masterclass', 'Comprehensive guide to becoming a data scientist', 'Data Science', 'Machine Learning', 39.99, 199.99, 80, 'BESTSELLER', 4.7, 2156, 32100, 3, 'https://api.example.com/datascience-course.jpg', 'Statistics;Python for Data;Machine Learning;Data Visualization;Deep Learning', '60 hours video;15 real-world projects;Jupyter notebooks;Dataset access;Certificate', 'Google;IBM;Amazon;Apple', NOW(), NOW()),
('JavaScript Advanced', 'Deep dive into advanced JavaScript concepts', 'Development', 'JavaScript', 24.99, 129.99, 81, 'BESTSELLER', 4.8, 2890, 38500, 2, 'https://api.example.com/js-advanced.jpg', 'Closures;Promises;Async/Await;Functional Programming;Modules', '45 hours video;25 code challenges;Practice projects;Community;Certificate', 'Google;Microsoft;Facebook;Apple', NOW(), NOW()),
('Web Design Fundamentals', 'Learn the art and science of web design', 'Design', 'UI/UX', 14.99, 79.99, 81, 'NEW', 4.6, 1234, 18900, 1, 'https://api.example.com/webdesign-course.jpg', 'Design Principles;Color Theory;Typography;User Experience;Prototyping', '30 hours video;10 design projects;Design tools tutorial;Templates;Certificate', 'Adobe;Figma;Sketch', NOW(), NOW());

-- Insert sample course sections
INSERT INTO CourseSections (CourseId, Day, Title, Duration) VALUES
(1, 'Day 1', 'Python Introduction and Environment Setup', '4 hours'),
(1, 'Day 2', 'Variables, Data Types, and Operations', '4 hours'),
(1, 'Day 3', 'Control Flow and Functions', '4.5 hours'),
(2, 'Day 1', 'React Fundamentals and JSX', '3.5 hours'),
(2, 'Day 2', 'Components and Props', '4 hours'),
(2, 'Day 3', 'Hooks and State Management', '4.5 hours'),
(3, 'Day 1', 'Statistics and Probability Basics', '5 hours'),
(3, 'Day 2', 'Data Manipulation with Pandas', '5 hours'),
(3, 'Day 3', 'Machine Learning Fundamentals', '5.5 hours');

-- Insert sample course lectures
INSERT INTO CourseLectures (SectionId, Title, Duration, VideoUrl) VALUES
-- Day 1 Python lectures
(1, 'What is Python and Why Learn It', '15 min', 'https://example.com/videos/python-intro-1.mp4'),
(1, 'Setting Up Your Python Environment', '20 min', 'https://example.com/videos/python-intro-2.mp4'),
(1, 'Your First Python Program', '18 min', 'https://example.com/videos/python-intro-3.mp4'),
-- Day 2 Python lectures
(2, 'Variables and Naming Conventions', '22 min', 'https://example.com/videos/python-day2-1.mp4'),
(2, 'Numeric Data Types', '25 min', 'https://example.com/videos/python-day2-2.mp4'),
(2, 'String Manipulation', '28 min', 'https://example.com/videos/python-day2-3.mp4'),
-- Day 1 React lectures
(4, 'What is React', '12 min', 'https://example.com/videos/react-intro-1.mp4'),
(4, 'JSX Syntax and Expression', '20 min', 'https://example.com/videos/react-intro-2.mp4'),
(4, 'Rendering Elements', '18 min', 'https://example.com/videos/react-intro-3.mp4');

-- Insert sample course reviews
INSERT INTO CourseReviews (CourseId, Name, Rating, Time, Text) VALUES
(1, 'John Doe', 5, '2 weeks ago', 'Excellent course! Very comprehensive and well-structured. The instructor is great!'),
(1, 'Jane Smith', 5, '1 month ago', 'Best Python course I have taken. Highly recommended!'),
(1, 'Bob Wilson', 4, '3 weeks ago', 'Good course with practical examples. Could be more challenging.'),
(2, 'Alice Brown', 5, '1 week ago', 'React course is amazing! Easy to follow and very practical.'),
(2, 'Charlie Davis', 5, '2 weeks ago', 'Great instructor and well-organized content. Already built 3 apps!'),
(3, 'David Lee', 4, '1 month ago', 'Solid data science course. Very informative.'),
(3, 'Eve Johnson', 5, '3 weeks ago', 'Love the real-world projects and datasets!');
