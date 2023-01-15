import http from 'http';
import { read_post, write_post } from './fs/fs_api.js';
import url from 'url';

let options = { "Content-Type": "aplication/json", "Access-Control-Allow-Origin": "*" };
http.createServer((req, res) => {
    if (req.method === 'POST') {
        if (req.url == '/get_courses') {
            let courses = read_post('course.json');
            res.writeHead(200, options);
            res.end(JSON.stringify(courses))
        };
        if (req.url == '/create_course') {
            req.on('data', (chunk) => {
                let new_course = JSON.parse(chunk);
                let courses = read_post('course.json');
                courses.push({ id: courses.at(-1).id + 1, ...new_course });
                write_post('course.json', courses);
                res.writeHead(200, options);
                res.end('Created course!!!');
            });
        };
        let course_id = url.parse(req.url).pathname.split('/')[2];
        if (req.url === `/update_course/${course_id}`) {
            req.on('data', (chunk) => {
                let update_course = JSON.parse(chunk);
                let courses = read_post('course.json');
                let { yourname, title, sms, rasm } = update_course;
                courses.forEach(course => {
                    if (course.id == course_id) {
                        yourname && (course.yourname = yourname);
                        title && (course.title = title);
                        sms && (course.sms = sms);
                        rasm && (course.rasm = rasm);
                    }
                });
                write_post('course.json', courses);
                res.writeHead(200, options);
                res.end('course updated!');
            });
        };
        if (req.url === `/delete_course/${course_id}`) {
            let courses = read_post('course.json');
            courses.forEach((course, idx) => {
                if (course.id == course_id) {
                    courses.splice(idx, 1);
                };
            });
            write_post('course.json', courses);
            res.writeHead(200, options);
            res.end('course deleted!');   
        };
    };     
}).listen(2007, () => {
    console.log('Server on the 2007 port!');
})