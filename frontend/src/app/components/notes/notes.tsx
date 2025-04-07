import { AiFillDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import "./styles.css";
import "./styles-priority.css";

type NoteProps = {
    note: {
        id: string;
        title: string;
        notes: string;
        priority: boolean;
    }
}

export default function Notes(props: NoteProps) {
    return (
        <>
            <li className="notepad-infos">
                <div>
                    <strong>{props.note.title}</strong>
                    <div>
                        <AiFillDelete 
                            size={20}
                        />
                    </div>
                </div>
                <textarea
                    defaultValue={props.note.notes}
                />
                <span>
                    <AiOutlineExclamationCircle 
                        size={20}
                    />
                </span>
            </li>
        </>
    );
}
