//Hàm trả về ngày thứ 2 trong tuần.
export default function () {
    let today = new Date();
    let day = today.getDay() || 7;
    if(day !== 1) {
        today.setHours(-24 * (day - 1));
    }
    return today;
}