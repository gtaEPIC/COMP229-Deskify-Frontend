class TicketModel {
    constructor(record, title, description, status, priority, dateCreated, updated, user, iteration, resolution) {
        this.record = record || "";
        this.title = title || "";
        this.description = description || "";
        this.status = status || "";
        this.priority = priority || 0;
        this.dateCreated = new Date(dateCreated) || new Date();
        this.updated = new Date(updated) || new Date();
        this.user = user || "";
        this.iteration = iteration || [];
        this.resolution = resolution || null;
    }
}

export default TicketModel;