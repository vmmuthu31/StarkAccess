interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  logo: string;
}

interface EventCardProps {
  event: Event;
  userRole?: string;
  onDelete?: (id: string) => void;
}

const EventCard = ({ event, userRole, onDelete }: EventCardProps) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <img src={event.image} alt={event.name} />
      {userRole === "admin" && (
        <button onClick={() => onDelete?.(event._id)}>Delete</button>
      )}
    </div>
  );
};

export default EventCard;
