import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import styles from './Booking.module.css'; // Import the CSS Module
import { Visa, Mastercard, Googlepay } from 'react-pay-icons';


const Booking = () => {
	const { id } = useParams();
	const [hostel, setHostel] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [paymentMethod, setPaymentMethod] = useState('mastercard');
	const [cardDetails, setCardDetails] = useState({
		number: '',
		expiry: '',
		cvv: '',
	});
	const [mobileDetails, setMobileDetails] = useState({ phone: '' });
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		// ... (fetchHostel function remains the same as previous response) ...
		const fetchHostel = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8000/api/hostels/${id}`
				);
				setHostel(response.data.data || response.data);
			} catch (error) {
				console.error(error);
				toast.error('Failed to load hostel details.');
			} finally {
				setIsLoading(false);
			}
		};
		fetchHostel();
	}, [id]);

	const handlePaymentChange = (e) => {
		setPaymentMethod(e.target.value);
	};

	const handleCardDetailsChange = (e) => {
		setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
	};

	const handleMobileDetailsChange = (e) => {
		setMobileDetails({ ...mobileDetails, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const token = localStorage.getItem('token');
		if (!token) {
			toast.error('You must be logged in to book a hostel.');
			navigate('/login');
			setIsLoading(false);
			return;
		}

		let paymentData = { hostelId: id, paymentMethod };
		if (paymentMethod === 'mastercard') {
			paymentData = { ...paymentData, ...cardDetails };
		} else {
			paymentData = { ...paymentData, ...mobileDetails };
		}

		try {
			// --- Post booking with Authorization header and payment details ---
			// eslint-disable-next-line no-unused-vars
			const response = await axios.post(
				'http://localhost:8000/api/bookings',
				paymentData, // Send all relevant data to backend
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success('Booking confirmed successfully for the semester!');
			navigate('/account', {
				state: { message: 'Booking added successfully!' },
			});
		} catch (error) {
			console.error(error);
			const errorMsg = error.response?.data?.message || 'Booking failed.';
			toast.error(errorMsg);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading || !hostel) {
		return <div className={styles.loading}>Loading hostel details...</div>;
	}

	// Conditional Rendering for Payment Fields
	const renderPaymentFields = () => {
		if (paymentMethod === 'mastercard') {
			return (
				<div className={styles.cardContent}>
					<div className={styles.formGroup}>
						<label htmlFor="number">Card Number</label>
						<input
							type="text"
							id="number"
							name="number"
							value={cardDetails.number}
							onChange={handleCardDetailsChange}
							placeholder="•••• •••• •••• ••••"
							required
						/>
					</div>
					<div
						className={styles.formGroup}
						style={{ display: 'flex', gap: '20px' }}
					>
						<div style={{ flex: 1 }}>
							<label htmlFor="expiry">Expiry (MM/YY)</label>
							<input
								type="text"
								id="expiry"
								name="expiry"
								value={cardDetails.expiry}
								onChange={handleCardDetailsChange}
								placeholder="MM/YY"
								required
							/>
						</div>
						<div style={{ flex: 1 }}>
							<label htmlFor="cvv">CVV</label>
							<input
								type="text"
								id="cvv"
								name="cvv"
								value={cardDetails.cvv}
								onChange={handleCardDetailsChange}
								placeholder="CVV"
								required
							/>
						</div>
					</div>
				</div>
			);
		} else if (paymentMethod === 'airtel' || paymentMethod === 'mtn') {
			return (
				<div className={styles.cardContent}>
					<p>
						You will be prompted to enter your PIN on your phone after
						submitting.
					</p>
					<div className={styles.formGroup}>
						<label htmlFor="phone">Phone Number</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={mobileDetails.phone}
							onChange={handleMobileDetailsChange}
							placeholder="e.g., +2567XXXXXXXX"
							required
						/>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className={styles.container}>
			<Toaster position="top-right" />
			<div
				className={styles.card}
				style={{ maxWidth: '600px', margin: '0 auto' }}
			>
				<div className={`${styles.cardContent} ${styles.textCenter}`}>
					<h1>Confirm Booking</h1>

					<div className={`${styles.card} ${styles.hostelDetailsCard}`}>
						<div className={styles.cardContent}>
							<h3>{hostel.name}</h3>
							<p>Location: {hostel.location}</p>
							<p className={styles.price}>Semester Price: UGX {hostel.price}</p>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className={styles.paymentOptions}>
							<h2>Select Payment Method</h2>

							{/* MasterCard Option */}
							<div className={styles.paymentOption}>
								<input
									type="radio"
									id="mastercard"
									name="paymentMethod"
									value="mastercard"
									checked={paymentMethod === 'mastercard'}
									onChange={handlePaymentChange}
								/>
								<label htmlFor="mastercard">
									<Mastercard style={{ margin: 10, width: 80 }} />
									MasterCard / <Visa style={{ margin: 10, width: 80 }} />
									Visa Card
								</label>
							</div>

							{/* Airtel Money Option */}
							<div className={styles.paymentOption}>
								<input
									type="radio"
									id="airtel"
									name="paymentMethod"
									value="airtel"
									checked={paymentMethod === 'airtel'}
									onChange={handlePaymentChange}
								/>
								<label htmlFor="airtel">Airtel Money</label>
							</div>

							{/* MTN MoMo Pay Option */}
							<div className={styles.paymentOption}>
								<input
									type="radio"
									id="mtn"
									name="paymentMethod"
									value="mtn"
									checked={paymentMethod === 'mtn'}
									onChange={handlePaymentChange}
								/>
								<label htmlFor="mtn">MTN MoMo Pay</label>
							</div>
						</div>

						{renderPaymentFields()}

						<button
							type="submit"
							className={`${styles.btn} ${styles.btnPrimary}`}
							disabled={isLoading}
						>
							{isLoading ? 'Processing...' : 'Confirm Booking for Semester'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Booking;
