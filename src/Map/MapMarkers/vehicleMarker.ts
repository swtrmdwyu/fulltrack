import MarkerTypeName from "../../types/MarkerTypeName";

export default function vehicleMarkerSVG(markerType: MarkerTypeName) {
    switch(markerType) { 
        case "moving":
            return(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#263F80"/>
            <rect x="2" y="2" width="36" height="36" rx="18" stroke="#3972EE" stroke-width="4"/>
            <path d="M9.875 21.9375H21.6875C22.2852 21.9375 22.8125 21.4453 22.8125 20.8125V13.5C22.8125 12.9023 22.2852 12.375 21.6875 12.375H9.875C9.24219 12.375 8.75 12.9023 8.75 13.5V20.8125C8.75 21.4453 9.24219 21.9375 9.875 21.9375ZM10.4375 14.0625H21.125V20.25H10.4375V14.0625ZM30.582 18.4922L28.5078 16.418C28.0859 15.9961 27.5234 15.7852 26.9258 15.7852H25.0625C24.4297 15.7852 23.9375 16.2773 23.9375 16.9102V23.0977H9.875C9.24219 23.0977 8.75 23.5898 8.75 24.2227V25.1719C8.75 26.6133 9.73438 27.9141 11.1758 28.125C12.2305 28.2656 13.2148 27.7734 13.8125 27C14.4453 27.8789 15.5703 28.3711 16.8008 28.0547C17.6797 27.8086 18.418 27.1406 18.6992 26.2617C18.875 25.7344 18.9102 25.2422 18.8047 24.7852H24.5352C24.4648 25.2422 24.4648 25.7344 24.6406 26.2617C24.9219 27.1406 25.6953 27.8438 26.6094 28.0547C28.4375 28.5117 30.125 27.1055 30.125 25.3477C30.125 25.1367 30.0898 24.9609 30.0547 24.7852H30.6875C30.9688 24.7852 31.25 24.5039 31.25 24.2227V20.0742C31.25 19.4766 31.0039 18.9141 30.582 18.4922ZM11.5625 26.4375C10.9297 26.4375 10.4375 25.9453 10.4375 25.3125C10.4375 24.7148 10.9297 24.1875 11.5625 24.1875C12.1602 24.1875 12.6875 24.7148 12.6875 25.3125C12.6875 25.9453 12.1602 26.4375 11.5625 26.4375ZM16.0625 26.4375C15.4297 26.4375 14.9375 25.9453 14.9375 25.3125C14.9375 24.7148 15.4297 24.1875 16.0625 24.1875C16.6602 24.1875 17.1875 24.7148 17.1875 25.3125C17.1875 25.9453 16.6602 26.4375 16.0625 26.4375ZM25.625 17.4375H26.9258C27.0664 17.4375 27.207 17.5078 27.3125 17.6133L28.8594 19.125H25.625V17.4375ZM27.3125 26.4375C26.6797 26.4375 26.1875 25.9453 26.1875 25.3125C26.1875 24.7148 26.6797 24.1875 27.3125 24.1875C27.9102 24.1875 28.4375 24.7148 28.4375 25.3125C28.4375 25.9453 27.9102 26.4375 27.3125 26.4375ZM29.5625 23.0625H28.9648C28.5078 22.7461 27.9102 22.5 27.3125 22.5C26.6797 22.5 26.082 22.7461 25.625 23.0625V20.25H29.5625V23.0625ZM13.5312 15.1875H12.4062C12.2305 15.1875 12.125 15.3281 12.125 15.4688V18.8438C12.125 19.0195 12.2305 19.125 12.4062 19.125H13.5312C13.6719 19.125 13.8125 19.0195 13.8125 18.8438V15.4688C13.8125 15.3281 13.6719 15.1875 13.5312 15.1875ZM19.1562 15.1875H18.0312C17.8555 15.1875 17.75 15.3281 17.75 15.4688V18.8438C17.75 19.0195 17.8555 19.125 18.0312 19.125H19.1562C19.2969 19.125 19.4375 19.0195 19.4375 18.8438V15.4688C19.4375 15.3281 19.2969 15.1875 19.1562 15.1875ZM16.3438 15.1875H15.2188C15.043 15.1875 14.9375 15.3281 14.9375 15.4688V18.8438C14.9375 19.0195 15.043 19.125 15.2188 19.125H16.3438C16.4844 19.125 16.625 19.0195 16.625 18.8438V15.4688C16.625 15.3281 16.4844 15.1875 16.3438 15.1875Z" fill="white"/>
            <circle cx="20" cy="48" r="4" fill="#3251A6"/>
            </svg>`);

        case "ignition-on":
            return(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#0A6249"/>
            <rect x="2" y="2" width="36" height="36" rx="18" stroke="#12B285" stroke-width="4"/>
            <path d="M9.875 21.9375H21.6875C22.2852 21.9375 22.8125 21.4453 22.8125 20.8125V13.5C22.8125 12.9023 22.2852 12.375 21.6875 12.375H9.875C9.24219 12.375 8.75 12.9023 8.75 13.5V20.8125C8.75 21.4453 9.24219 21.9375 9.875 21.9375ZM10.4375 14.0625H21.125V20.25H10.4375V14.0625ZM30.582 18.4922L28.5078 16.418C28.0859 15.9961 27.5234 15.7852 26.9258 15.7852H25.0625C24.4297 15.7852 23.9375 16.2773 23.9375 16.9102V23.0977H9.875C9.24219 23.0977 8.75 23.5898 8.75 24.2227V25.1719C8.75 26.6133 9.73438 27.9141 11.1758 28.125C12.2305 28.2656 13.2148 27.7734 13.8125 27C14.4453 27.8789 15.5703 28.3711 16.8008 28.0547C17.6797 27.8086 18.418 27.1406 18.6992 26.2617C18.875 25.7344 18.9102 25.2422 18.8047 24.7852H24.5352C24.4648 25.2422 24.4648 25.7344 24.6406 26.2617C24.9219 27.1406 25.6953 27.8438 26.6094 28.0547C28.4375 28.5117 30.125 27.1055 30.125 25.3477C30.125 25.1367 30.0898 24.9609 30.0547 24.7852H30.6875C30.9688 24.7852 31.25 24.5039 31.25 24.2227V20.0742C31.25 19.4766 31.0039 18.9141 30.582 18.4922ZM11.5625 26.4375C10.9297 26.4375 10.4375 25.9453 10.4375 25.3125C10.4375 24.7148 10.9297 24.1875 11.5625 24.1875C12.1602 24.1875 12.6875 24.7148 12.6875 25.3125C12.6875 25.9453 12.1602 26.4375 11.5625 26.4375ZM16.0625 26.4375C15.4297 26.4375 14.9375 25.9453 14.9375 25.3125C14.9375 24.7148 15.4297 24.1875 16.0625 24.1875C16.6602 24.1875 17.1875 24.7148 17.1875 25.3125C17.1875 25.9453 16.6602 26.4375 16.0625 26.4375ZM25.625 17.4375H26.9258C27.0664 17.4375 27.207 17.5078 27.3125 17.6133L28.8594 19.125H25.625V17.4375ZM27.3125 26.4375C26.6797 26.4375 26.1875 25.9453 26.1875 25.3125C26.1875 24.7148 26.6797 24.1875 27.3125 24.1875C27.9102 24.1875 28.4375 24.7148 28.4375 25.3125C28.4375 25.9453 27.9102 26.4375 27.3125 26.4375ZM29.5625 23.0625H28.9648C28.5078 22.7461 27.9102 22.5 27.3125 22.5C26.6797 22.5 26.082 22.7461 25.625 23.0625V20.25H29.5625V23.0625ZM13.5312 15.1875H12.4062C12.2305 15.1875 12.125 15.3281 12.125 15.4688V18.8438C12.125 19.0195 12.2305 19.125 12.4062 19.125H13.5312C13.6719 19.125 13.8125 19.0195 13.8125 18.8438V15.4688C13.8125 15.3281 13.6719 15.1875 13.5312 15.1875ZM19.1562 15.1875H18.0312C17.8555 15.1875 17.75 15.3281 17.75 15.4688V18.8438C17.75 19.0195 17.8555 19.125 18.0312 19.125H19.1562C19.2969 19.125 19.4375 19.0195 19.4375 18.8438V15.4688C19.4375 15.3281 19.2969 15.1875 19.1562 15.1875ZM16.3438 15.1875H15.2188C15.043 15.1875 14.9375 15.3281 14.9375 15.4688V18.8438C14.9375 19.0195 15.043 19.125 15.2188 19.125H16.3438C16.4844 19.125 16.625 19.0195 16.625 18.8438V15.4688C16.625 15.3281 16.4844 15.1875 16.3438 15.1875Z" fill="white"/>
            <circle cx="20" cy="48" r="4" fill="#3251A6"/>
            </svg>`);

        case "ignition-off": 
            return(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#6B757C"/>
            <path d="M9.875 21.9375H21.6875C22.2852 21.9375 22.8125 21.4453 22.8125 20.8125V13.5C22.8125 12.9023 22.2852 12.375 21.6875 12.375H9.875C9.24219 12.375 8.75 12.9023 8.75 13.5V20.8125C8.75 21.4453 9.24219 21.9375 9.875 21.9375ZM10.4375 14.0625H21.125V20.25H10.4375V14.0625ZM30.582 18.4922L28.5078 16.418C28.0859 15.9961 27.5234 15.7852 26.9258 15.7852H25.0625C24.4297 15.7852 23.9375 16.2773 23.9375 16.9102V23.0977H9.875C9.24219 23.0977 8.75 23.5898 8.75 24.2227V25.1719C8.75 26.6133 9.73438 27.9141 11.1758 28.125C12.2305 28.2656 13.2148 27.7734 13.8125 27C14.4453 27.8789 15.5703 28.3711 16.8008 28.0547C17.6797 27.8086 18.418 27.1406 18.6992 26.2617C18.875 25.7344 18.9102 25.2422 18.8047 24.7852H24.5352C24.4648 25.2422 24.4648 25.7344 24.6406 26.2617C24.9219 27.1406 25.6953 27.8438 26.6094 28.0547C28.4375 28.5117 30.125 27.1055 30.125 25.3477C30.125 25.1367 30.0898 24.9609 30.0547 24.7852H30.6875C30.9688 24.7852 31.25 24.5039 31.25 24.2227V20.0742C31.25 19.4766 31.0039 18.9141 30.582 18.4922ZM11.5625 26.4375C10.9297 26.4375 10.4375 25.9453 10.4375 25.3125C10.4375 24.7148 10.9297 24.1875 11.5625 24.1875C12.1602 24.1875 12.6875 24.7148 12.6875 25.3125C12.6875 25.9453 12.1602 26.4375 11.5625 26.4375ZM16.0625 26.4375C15.4297 26.4375 14.9375 25.9453 14.9375 25.3125C14.9375 24.7148 15.4297 24.1875 16.0625 24.1875C16.6602 24.1875 17.1875 24.7148 17.1875 25.3125C17.1875 25.9453 16.6602 26.4375 16.0625 26.4375ZM25.625 17.4375H26.9258C27.0664 17.4375 27.207 17.5078 27.3125 17.6133L28.8594 19.125H25.625V17.4375ZM27.3125 26.4375C26.6797 26.4375 26.1875 25.9453 26.1875 25.3125C26.1875 24.7148 26.6797 24.1875 27.3125 24.1875C27.9102 24.1875 28.4375 24.7148 28.4375 25.3125C28.4375 25.9453 27.9102 26.4375 27.3125 26.4375ZM29.5625 23.0625H28.9648C28.5078 22.7461 27.9102 22.5 27.3125 22.5C26.6797 22.5 26.082 22.7461 25.625 23.0625V20.25H29.5625V23.0625ZM13.5312 15.1875H12.4062C12.2305 15.1875 12.125 15.3281 12.125 15.4688V18.8438C12.125 19.0195 12.2305 19.125 12.4062 19.125H13.5312C13.6719 19.125 13.8125 19.0195 13.8125 18.8438V15.4688C13.8125 15.3281 13.6719 15.1875 13.5312 15.1875ZM19.1562 15.1875H18.0312C17.8555 15.1875 17.75 15.3281 17.75 15.4688V18.8438C17.75 19.0195 17.8555 19.125 18.0312 19.125H19.1562C19.2969 19.125 19.4375 19.0195 19.4375 18.8438V15.4688C19.4375 15.3281 19.2969 15.1875 19.1562 15.1875ZM16.3438 15.1875H15.2188C15.043 15.1875 14.9375 15.3281 14.9375 15.4688V18.8438C14.9375 19.0195 15.043 19.125 15.2188 19.125H16.3438C16.4844 19.125 16.625 19.0195 16.625 18.8438V15.4688C16.625 15.3281 16.4844 15.1875 16.3438 15.1875Z" fill="white"/>
            <circle cx="20" cy="48" r="4" fill="#6B757C"/>
            </svg>`);

        case "block":
            return(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#942B35"/>
            <path d="M9.875 21.9375H21.6875C22.2852 21.9375 22.8125 21.4453 22.8125 20.8125V13.5C22.8125 12.9023 22.2852 12.375 21.6875 12.375H9.875C9.24219 12.375 8.75 12.9023 8.75 13.5V20.8125C8.75 21.4453 9.24219 21.9375 9.875 21.9375ZM10.4375 14.0625H21.125V20.25H10.4375V14.0625ZM30.582 18.4922L28.5078 16.418C28.0859 15.9961 27.5234 15.7852 26.9258 15.7852H25.0625C24.4297 15.7852 23.9375 16.2773 23.9375 16.9102V23.0977H9.875C9.24219 23.0977 8.75 23.5898 8.75 24.2227V25.1719C8.75 26.6133 9.73438 27.9141 11.1758 28.125C12.2305 28.2656 13.2148 27.7734 13.8125 27C14.4453 27.8789 15.5703 28.3711 16.8008 28.0547C17.6797 27.8086 18.418 27.1406 18.6992 26.2617C18.875 25.7344 18.9102 25.2422 18.8047 24.7852H24.5352C24.4648 25.2422 24.4648 25.7344 24.6406 26.2617C24.9219 27.1406 25.6953 27.8438 26.6094 28.0547C28.4375 28.5117 30.125 27.1055 30.125 25.3477C30.125 25.1367 30.0898 24.9609 30.0547 24.7852H30.6875C30.9688 24.7852 31.25 24.5039 31.25 24.2227V20.0742C31.25 19.4766 31.0039 18.9141 30.582 18.4922ZM11.5625 26.4375C10.9297 26.4375 10.4375 25.9453 10.4375 25.3125C10.4375 24.7148 10.9297 24.1875 11.5625 24.1875C12.1602 24.1875 12.6875 24.7148 12.6875 25.3125C12.6875 25.9453 12.1602 26.4375 11.5625 26.4375ZM16.0625 26.4375C15.4297 26.4375 14.9375 25.9453 14.9375 25.3125C14.9375 24.7148 15.4297 24.1875 16.0625 24.1875C16.6602 24.1875 17.1875 24.7148 17.1875 25.3125C17.1875 25.9453 16.6602 26.4375 16.0625 26.4375ZM25.625 17.4375H26.9258C27.0664 17.4375 27.207 17.5078 27.3125 17.6133L28.8594 19.125H25.625V17.4375ZM27.3125 26.4375C26.6797 26.4375 26.1875 25.9453 26.1875 25.3125C26.1875 24.7148 26.6797 24.1875 27.3125 24.1875C27.9102 24.1875 28.4375 24.7148 28.4375 25.3125C28.4375 25.9453 27.9102 26.4375 27.3125 26.4375ZM29.5625 23.0625H28.9648C28.5078 22.7461 27.9102 22.5 27.3125 22.5C26.6797 22.5 26.082 22.7461 25.625 23.0625V20.25H29.5625V23.0625ZM13.5312 15.1875H12.4062C12.2305 15.1875 12.125 15.3281 12.125 15.4688V18.8438C12.125 19.0195 12.2305 19.125 12.4062 19.125H13.5312C13.6719 19.125 13.8125 19.0195 13.8125 18.8438V15.4688C13.8125 15.3281 13.6719 15.1875 13.5312 15.1875ZM19.1562 15.1875H18.0312C17.8555 15.1875 17.75 15.3281 17.75 15.4688V18.8438C17.75 19.0195 17.8555 19.125 18.0312 19.125H19.1562C19.2969 19.125 19.4375 19.0195 19.4375 18.8438V15.4688C19.4375 15.3281 19.2969 15.1875 19.1562 15.1875ZM16.3438 15.1875H15.2188C15.043 15.1875 14.9375 15.3281 14.9375 15.4688V18.8438C14.9375 19.0195 15.043 19.125 15.2188 19.125H16.3438C16.4844 19.125 16.625 19.0195 16.625 18.8438V15.4688C16.625 15.3281 16.4844 15.1875 16.3438 15.1875Z" fill="white"/>
            <circle cx="20" cy="48" r="4" fill="#6B757C"/>
            </svg>`);
            

        case "no-signal":
            return(`<svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="36" height="36" rx="18" fill="#6C3D18"/>
            <rect x="2" y="2" width="36" height="36" rx="18" stroke="#CE7C3A" stroke-width="4"/>
            <path d="M9.875 21.9375H21.6875C22.2852 21.9375 22.8125 21.4453 22.8125 20.8125V13.5C22.8125 12.9023 22.2852 12.375 21.6875 12.375H9.875C9.24219 12.375 8.75 12.9023 8.75 13.5V20.8125C8.75 21.4453 9.24219 21.9375 9.875 21.9375ZM10.4375 14.0625H21.125V20.25H10.4375V14.0625ZM30.582 18.4922L28.5078 16.418C28.0859 15.9961 27.5234 15.7852 26.9258 15.7852H25.0625C24.4297 15.7852 23.9375 16.2773 23.9375 16.9102V23.0977H9.875C9.24219 23.0977 8.75 23.5898 8.75 24.2227V25.1719C8.75 26.6133 9.73438 27.9141 11.1758 28.125C12.2305 28.2656 13.2148 27.7734 13.8125 27C14.4453 27.8789 15.5703 28.3711 16.8008 28.0547C17.6797 27.8086 18.418 27.1406 18.6992 26.2617C18.875 25.7344 18.9102 25.2422 18.8047 24.7852H24.5352C24.4648 25.2422 24.4648 25.7344 24.6406 26.2617C24.9219 27.1406 25.6953 27.8438 26.6094 28.0547C28.4375 28.5117 30.125 27.1055 30.125 25.3477C30.125 25.1367 30.0898 24.9609 30.0547 24.7852H30.6875C30.9688 24.7852 31.25 24.5039 31.25 24.2227V20.0742C31.25 19.4766 31.0039 18.9141 30.582 18.4922ZM11.5625 26.4375C10.9297 26.4375 10.4375 25.9453 10.4375 25.3125C10.4375 24.7148 10.9297 24.1875 11.5625 24.1875C12.1602 24.1875 12.6875 24.7148 12.6875 25.3125C12.6875 25.9453 12.1602 26.4375 11.5625 26.4375ZM16.0625 26.4375C15.4297 26.4375 14.9375 25.9453 14.9375 25.3125C14.9375 24.7148 15.4297 24.1875 16.0625 24.1875C16.6602 24.1875 17.1875 24.7148 17.1875 25.3125C17.1875 25.9453 16.6602 26.4375 16.0625 26.4375ZM25.625 17.4375H26.9258C27.0664 17.4375 27.207 17.5078 27.3125 17.6133L28.8594 19.125H25.625V17.4375ZM27.3125 26.4375C26.6797 26.4375 26.1875 25.9453 26.1875 25.3125C26.1875 24.7148 26.6797 24.1875 27.3125 24.1875C27.9102 24.1875 28.4375 24.7148 28.4375 25.3125C28.4375 25.9453 27.9102 26.4375 27.3125 26.4375ZM29.5625 23.0625H28.9648C28.5078 22.7461 27.9102 22.5 27.3125 22.5C26.6797 22.5 26.082 22.7461 25.625 23.0625V20.25H29.5625V23.0625ZM13.5312 15.1875H12.4062C12.2305 15.1875 12.125 15.3281 12.125 15.4688V18.8438C12.125 19.0195 12.2305 19.125 12.4062 19.125H13.5312C13.6719 19.125 13.8125 19.0195 13.8125 18.8438V15.4688C13.8125 15.3281 13.6719 15.1875 13.5312 15.1875ZM19.1562 15.1875H18.0312C17.8555 15.1875 17.75 15.3281 17.75 15.4688V18.8438C17.75 19.0195 17.8555 19.125 18.0312 19.125H19.1562C19.2969 19.125 19.4375 19.0195 19.4375 18.8438V15.4688C19.4375 15.3281 19.2969 15.1875 19.1562 15.1875ZM16.3438 15.1875H15.2188C15.043 15.1875 14.9375 15.3281 14.9375 15.4688V18.8438C14.9375 19.0195 15.043 19.125 15.2188 19.125H16.3438C16.4844 19.125 16.625 19.0195 16.625 18.8438V15.4688C16.625 15.3281 16.4844 15.1875 16.3438 15.1875Z" fill="white"/>
            <circle cx="20" cy="48" r="4" fill="#6B757C"/>
            </svg>`)
            

        case undefined:
            return ""
    }
}