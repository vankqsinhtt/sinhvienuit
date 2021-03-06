import { betweenTwoSubString, htmlEntityDecode } from '../../utils';
import { Deadline } from './Object';

export function parseListDeadlineIdFromHtml(html) {
    let regex = /<table class="event">([\s\S]*?)(?=<\/table>)/gm;
    let match;
    let returnArray = [];
    while ((match = regex.exec(html)) !== null) {
        match = match[0];
        let id = betweenTwoSubString(match, 'https://courses.uit.edu.vn/mod/assign/view.php?id=', '"').trim();
        if ((id) && (id !== '')) {
            returnArray.push(id);
        }
    }
    return returnArray;
}
export function parseDeadlineFromHtml(html) {
    let id = betweenTwoSubString(html, '<a title="Assignment" href="', '"');
    let code = betweenTwoSubString(html, 'https://courses.uit.edu.vn/course/view.php?id=', '</li>');
    code = betweenTwoSubString(code, '>', '</a>').trim();
    let title = betweenTwoSubString(html, '<h2>', '</h2>').trim();
    title = htmlEntityDecode(title);
    let content = betweenTwoSubString(html, '<div class="no-overflow">', '</div>').trim();
    let time = betweenTwoSubString(html, 'Due date', '</tr>');
    time = betweenTwoSubString(time, '">', '</td>');
    time = Date.parse(time);
    let status;
    if (html.includes("overdue")) {
        //Deadline is overdue, so sad :(
        status =  -1;
    }
    else if (html.includes("submissionstatussubmitted")) {
        //Yeah yeah, not a deadline anymore!
        status =  1;
    }
    else {
        //It's a deadline, do asap!
        status = 0;
    }
    if (code && title && time) {
        return new Deadline({
            id: id,
            code: code,
            title: title,
            content: content,
            time: time,
            status: status
        });
    }
    return false;
}