import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes, { func } from "prop-types";

export const UpdateContact = props => {
	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	UpdateContact.propTypes = {
		match: PropTypes.object
	};

	const id = props.match.params.id;

	useEffect(() => {
		useEffectAux();
	}, []);

	async function useEffectAux() {
		await getContactById(id);
	}

	async function getContactById(id) {
		let contact = await actions.getContactById(id);
		asignContactValues(contact);
	}

	function asignContactValues(contact) {
		setFullName(contact.full_name);
		setEmail(contact.email);
		setPhone(contact.phone);
		setAddress(contact.address);
	}

	async function editContact() {
		await updateContact();
		window.open("/", "_self");
	}

	async function updateContact() {
		await actions.fetchUpdateContact(id, fullName, email, phone, address);
	}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Update Contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							onChange={event => setFullName(event.target.value)}
							defaultValue={fullName}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={event => setEmail(event.target.value)}
							defaultValue={email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={event => setPhone(event.target.value)}
							defaultValue={phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={event => setAddress(event.target.value)}
							defaultValue={address}
						/>
					</div>
					<button type="button" className="btn btn-primary form-control" onClick={editContact}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
