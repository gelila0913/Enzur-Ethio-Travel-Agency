// Booking System for Enzur-Ethio Travel Agency
class BookingSystem {
    constructor() {
        this.init();
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    createModal() {
        const modalHTML = `
            <div id="bookingModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <div id="bookingForm" class="booking-step active">
                        <h2>Book Your Tour</h2>
                        <form id="tourBookingForm">
                            <div class="form-group">
                                <label for="fullName">Full Name *</label>
                                <input type="text" id="fullName" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" required>
                            </div>
                            <button type="submit" class="btn-primary">Continue to Confirmation</button>
                        </form>
                    </div>

                    <div id="ticketStep" class="booking-step">
                        <h2>Booking Confirmed!</h2>
                        <div id="ticketContainer"></div>
                        <button id="cancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    attachEventListeners() {
        // Book Now buttons
        document.querySelectorAll('.btn-outline, .btn-primary').forEach(btn => {
            if (btn.textContent.includes('Book Now')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openBookingModal(btn);
                });
            }
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Form submission
        document.getElementById('tourBookingForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.confirmBooking();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });
    }

    openBookingModal(btn) {
        const packageCard = btn.closest('.package-card');
        const tourName = packageCard.querySelector('h3').textContent;
        const tourPrice = packageCard.querySelector('.package-price').textContent;
        
        this.currentTour = { name: tourName, price: tourPrice };
        document.getElementById('bookingModal').style.display = 'block';
        this.showBookingForm();
    }

    closeModal() {
        document.getElementById('bookingModal').style.display = 'none';
    }

    showBookingForm() {
        document.querySelectorAll('.booking-step').forEach(step => step.classList.remove('active'));
        document.getElementById('bookingForm').classList.add('active');
    }

    confirmBooking() {
        this.generateTicket();
        document.querySelectorAll('.booking-step').forEach(step => step.classList.remove('active'));
        document.getElementById('ticketStep').classList.add('active');
    }

    generateTicket() {
        const bookingId = 'ET' + Date.now().toString().slice(-6);
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        const ticketHTML = `
            <div class="ticket">
                <div class="ticket-header">
                    <h3>Enzur-Ethio Travel Agency</h3>
                    <p>Tour Booking Confirmation</p>
                </div>
                <div class="ticket-body">
                    <div class="ticket-info">
                        <p><strong>Booking ID:</strong> ${bookingId}</p>
                        <p><strong>Tour:</strong> ${this.currentTour.name}</p>
                        <p><strong>Price:</strong> ${this.currentTour.price}</p>
                    </div>
                    <div class="customer-info">
                        <p><strong>Customer:</strong> ${formData.name}</p>
                        <p><strong>Email:</strong> ${formData.email}</p>
                        <p><strong>Phone:</strong> ${formData.phone}</p>
                    </div>
                </div>
                <div class="ticket-footer">
                    <p>Please present this ticket on your tour date</p>
                    <p>Contact: +251 91 234 5678</p>
                </div>
            </div>
        `;

        document.getElementById('ticketContainer').innerHTML = ticketHTML;
    }

    downloadTicket() {
        const ticket = document.querySelector('.ticket');
        const ticketContent = ticket.outerHTML;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Tour Booking Ticket</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .ticket { border: 2px solid #1B5E20; border-radius: 10px; padding: 20px; max-width: 500px; }
                        .ticket-header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px; }
                        .ticket-header h3 { color: #1B5E20; margin: 0; }
                        .ticket-body { margin: 15px 0; }
                        .ticket-info, .customer-info { margin-bottom: 15px; }
                        .ticket-footer { text-align: center; border-top: 1px solid #ddd; padding-top: 10px; font-size: 0.9em; color: #666; }
                        p { margin: 5px 0; }
                    </style>
                </head>
                <body>${ticketContent}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize booking system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BookingSystem();
});