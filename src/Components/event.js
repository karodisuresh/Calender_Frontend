// client/src/components/EventList.js
import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../Services/EventService';
import './event.css'; // Import the CSS for styling

function Event() {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '' });
    const [editingEvent, setEditingEvent] = useState(null); // For editing an event

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const response = await getEvents();
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    };

    const handleCreateEvent = async () => {
        try {
            await createEvent(newEvent);
            loadEvents();
            setNewEvent({ title: '', date: '', time: '', description: '' });
        } catch (error) {
            console.error('Error creating event:', error.message);
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            loadEvents();
        } catch (error) {
            console.error('Error deleting event:', error.message);
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({
            title: event.title,
            date: event.date,
            time: event.time,
            description: event.description,
        });
    };

    const handleUpdateEvent = async () => {
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.id, newEvent); // Update the event in the backend
                loadEvents(); // Reload events
                setEditingEvent(null); // Reset editing state
                setNewEvent({ title: '', date: '', time: '', description: '' }); // Clear the form
            }
        } catch (error) {
            console.error('Error updating event:', error.message);
        }
    };

    return (
        <div className="container">
            <h2>Event List</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <div>
                            <strong>{event.title}</strong><br />
                            <small>{event.date} - {event.time}</small><br />
                            <p>{event.description}</p>
                        </div>
                        <button onClick={() => handleEditEvent(event)}>Edit</button> &nbsp;
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>{editingEvent ? 'Edit Event' : 'Create Event'}</h2>
            <form>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <div>
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                    <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                </div>
                <textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                {editingEvent ? (
                    <button type="button" onClick={handleUpdateEvent}>Update Event</button>
                ) : (
                    <button type="button" onClick={handleCreateEvent}>Create Event</button>
                )}
            </form>
        </div>
    );
}

export default Event;
