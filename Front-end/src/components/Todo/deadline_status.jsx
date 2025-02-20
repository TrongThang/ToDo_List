import { useEffect, useState } from "react";

export default function DeadlineStatus({deadline, setStatus, status, todo}) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const diff = new Date(deadline) - now;
            
            if (diff <= 0) {
                setStatus("expired");
                return { days: 0, hours: 0, minutes: 0 };
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);

            if (todo.active) setStatus("finished");
            else if (days >= 1) setStatus("todo");
            else if (hours >= 12) setStatus("prepare");
            else if (hours >= 1) setStatus("deadline");
            else if (minutes > 0) setStatus("important");
            else if (minutes <= 0) setStatus("expired");
            else setStatus(null)

            return { days, hours, minutes };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);

        return () => clearInterval(timer);
    }, [deadline]);

    const getBackgroundClass = () => {
        switch (status) {
            case "todo": return "bg-secondary";
            case "prepare": return "bg-warning text-dark";
            case "deadline": return "bg-danger";
            case "important": return "bg-danger fw-bold border border-light";
            case "expired": return "bg-dark text-white";
            case "finished": return "bg-success text-white"
            default: return "bg-secondary";
        }
    };

    const timeDisplay = () => {
        if(todo.active) return `Hoàn thành🎉`
        if (timeLeft.days >= 1) return `${timeLeft.days}D${timeLeft.hours}H🔥`;
        if (timeLeft.hours >= 1) return `${timeLeft.hours}H${timeLeft.minutes}M🔥`;
        if (timeLeft.minutes >= 1) return `${timeLeft.minutes} phút🔥`;

        return "Cháyyyyy"
    };

    return (
        <span style={{width: "130px", padding: "0px"}} className={`${getBackgroundClass()} deadline-status`}>{timeDisplay()}</span>
    );
}