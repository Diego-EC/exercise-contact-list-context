import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false
	});
	const { store, actions } = useContext(Context);
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		useEffectAux();
	}, []);

	async function useEffectAux() {
		await getContacts();
		const contactsMap = mapContacts();
		setContacts(contactsMap);
	}

	async function getContacts() {
		await actions.fetchGetContacts();
	}

	function mapContacts() {
		let jsonMap = [];
		if (store.contacts) {
			jsonMap = store.contacts.map(function(contact, index) {
				return {
					id: contact.id,
					fullName: contact.full_name,
					email: contact.email,
					phone: contact.phone,
					address: contact.address
				};
			});
		}
		return jsonMap;
	}

	async function updateContact(id, fullName, email, phone, address) {
		console.log("updateContact");
		console.log(id);
	}

	async function deleteContact(id) {
		let json = await actions.fetchDeleteContact(id);
		if (json["msg"] == "ok") {
			await getContacts();
			const contactsMap = mapContacts();
			setContacts(contactsMap);
		}
	}

	const contactCardsHtml = contacts.map((contact, index) => {
		return (
			<ContactCard
				key={index}
				id={contact.id}
				fullName={contact.fullName}
				email={contact.email}
				phone={contact.phone}
				address={contact.address}
				deleteContact={deleteContact}
				updateContact={updateContact}
			/>
		);
	});

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{contactCardsHtml}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
