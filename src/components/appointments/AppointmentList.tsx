interface Appointment {
  time: string;
  student: string;
  reason: string;
  status: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({
  appointments,
}: AppointmentListProps) => {
  return (
    <section>

      <h2>
        Atenciones programadas
      </h2>

      <ul>

        {appointments.map((appointment) => (

          <li
            key={`${appointment.time}-${appointment.student}`}
          >

            <strong>
              {appointment.time}
            </strong>

            <span>
              {appointment.student}
            </span>

            <span>
              {appointment.reason}
            </span>

            <em>
              {appointment.status}
            </em>

          </li>

        ))}

      </ul>

    </section>
  );
};

export default AppointmentList;