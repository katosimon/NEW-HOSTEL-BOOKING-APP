import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			setError('Please fill in all fields.');
			setSuccess('');
			return;
		}

		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const result = await axios.post(
				'https://new-hostel-booking-app.onrender.com/api/users/register',
				{
					email,
					name,
					password,
				}
			);

			console.log(result.data);

			if (
				result.data.message === 'User registered successfully' ||
				result.status === 201
			) {
				setSuccess('Registration successful! Redirecting to login...');
				setTimeout(() => navigate('/login'), 1500);
			} else {
				setError('Registration failed. Please try again.');
			}
		} catch (err) {
			console.log(err);

			if (err.response) {
				setError(err.response.data.message || 'Registration failed.');
			} else if (err.request) {
				setError('No response from server. Please try again.');
			} else {
				setError('An unexpected error occurred.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
			<div className="bg-white p-7 rounded w-150 shadow">
				<h2 className="mb-6 text-center">Register</h2>

				{error && (
					<div className="alert alert-danger py-2" role="alert">
						{error}
					</div>
				)}
				{success && (
					<div className="alert alert-success py-2" role="alert">
						{success}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="name">
							<strong>Full Name</strong>
						</label>
						<input
							type="text"
							id="name"
							placeholder="Enter Full Name"
							autoComplete="off"
							className="form-control rounded-0"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email">
							<strong>Email</strong>
						</label>
						<input
							type="email"
							id="email"
							placeholder="Enter Email"
							autoComplete="off"
							className="form-control rounded-0"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password">
							<strong>Password</strong>
						</label>
						<input
							type="password"
							id="password"
							placeholder="Enter Password"
							autoComplete="off"
							className="form-control rounded-0"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="btn btn-success w-100 rounded-0"
						disabled={loading}
					>
						{loading ? 'Registering...' : 'Register'}
					</button>
				</form>

				<p className="mt-3 text-center">Already have an account?</p>
				<Link to="/login" className="btn btn-outline-secondary w-100 rounded-0">
					Login
				</Link>
			</div>
		</div>
	);
}

export default Signup;

