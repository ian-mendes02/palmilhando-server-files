export default class Lead {
    constructor (name, email, tag, time) {
        this.event_info = {
            "event_name": "lead",
            "event_source": window.location.href,
            "event_time": this.date(),
            "time_spent": time
        };
        this.user = this.info(name, email);
        this.tag = tag || "";
    }
    info(name, email) {
        const normalize = (s) => {return s.toLowerCase().trim()};
        let names = normalize(name).split(" ");
        let fn = "";
        let ln = "";
        if (names.length >= 2) {
            fn = names[0];
            ln = names.slice(1).join(" ");
        } else {
            fn = names[0];
        };
        let info = {
            nome: fn,
            sobrenome: ln,
            email: normalize(email)
        };
        return info;
    };
    date() {
        let t = new Date;
        let time = {
            d: t.getDate(),
            m: t.getMonth() + 1,
            y: t.getFullYear() + 1
        };
        let date = [time.d, time.m, time.y];
        let d = date.reverse().join("-");
        let h = t.getHours(d);
        let m = t.getMinutes(d);
        if (h < 10) '0' += h;
        if (m < 10) '0' += m;
        let now = {
            date: date.reverse().join("-"),
            time: [h, m].join(":")
        };
        return now;
    };
}