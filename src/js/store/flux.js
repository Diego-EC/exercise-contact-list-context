const getState = ({ getStore, setStore, getActions }) => {
	const AGENDA_SLUG = "diego_ec";
	const ROOT = "https://assets.breatheco.de/apis/fake/contact/";
	const CONTACTS = "agenda/diego_ec";
	const ADD_CONTACT = "";
	const DELETE_CONTACT = "";
	const UPDATE_CONTACT = "";

	return {
		store: {
			contacts: []
		},
		actions: {
			fetchGetContacts: async () => {
				let json = await getActions().doFetch(ROOT + CONTACTS, "GET");

				if (json) {
					getActions().setContacts(json);
				}
			},

			fetchAddContact: async (full_name, email, phone, address) => {
				let body = {
					full_name: full_name,
					email: email,
					agenda_slug: AGENDA_SLUG,
					phone: phone,
					address: address
				};
				let json = await getActions().doFetch(ROOT, "POST", body);

				if (json) {
					getActions().setContacts(json);
				}
			},
			fetchUpdateContact: async (id, full_name, email, phone, address) => {
				let body = {
					full_name: full_name,
					email: email,
					phone: phone,
					address: address
				};

				let json = await getActions().doFetch(ROOT + id, "PUT", body);
				if (json) {
					return json;
				}
			},
			fetchDeleteContact: async id => {
				let json = await getActions().doFetch(ROOT + id, "DELETE");
				if (json["msg"] == "ok") {
					return json;
				}
			},

			doFetch: (endpoint, method, body = null) => {
				let fetchOptions;
				if (body == null) {
					fetchOptions = {
						method: method,
						headers: { "Content-Type": "application/json" }
					};
				} else {
					fetchOptions = {
						method: method,
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body)
					};
				}

				return fetch(endpoint, fetchOptions)
					.then(response => {
						if (response.ok) {
							return response.json();
						} else {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.catch(error => {
						throw Error(error);
						return null;
					});
			},

			setContacts: json => {
				setStore({ contacts: json });
			},
			getContactById: id => {
				let store = getStore();
				var result = store.contacts.find(obj => {
					return obj.id == id;
				});
				return result;
			}
		}
	};
};

export default getState;
