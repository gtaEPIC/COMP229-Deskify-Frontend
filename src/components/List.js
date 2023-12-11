import {Link} from "react-router-dom";
import React from "react";

function List({tickets, loading}) {
    return (
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope="col">Record</th>
                <th scope="col">Title</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Created</th>
                <th scope="col">Last Update</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {tickets.map(ticket => (
                <tr>
                    <th scope="row">{ticket.record}</th>
                    <td>{ticket.title}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.status}</td>
                    <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
                    <td>{new Date(ticket.updated).toLocaleString()}</td>
                    <td><Link to={`/tickets/${ticket.record}`} className="btn btn-primary">
                        View
                    </Link>
                    </td>
                </tr>
            ))}
            {tickets.length === 0 && (<tr>
                <td colSpan="7" className={"text-center"}>{
                    loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </>
                    ) : "No tickets found."
                }</td>
            </tr>)}
            </tbody>
        </table>)
}

export default List;