import { AiFillDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import "./styles.css";
import "./styles-priority.css";

type NoteProps = {
    note: {
        id: string;
        title: string;
        notes: string;
        priority: boolean;
    };
    handleDelete: (id: string) => void;
    handleChangePriority: (id: string) => void;
}

export default function Notes(props: NoteProps) {

    const { note, handleDelete, handleChangePriority} = props;

    return (
        <>
            <li className={props.note.priority ? "notepad-infos-priority" : "notepad-infos"}>
                <div>
                    <strong>{props.note.title}</strong>
                    <div>
                        <AiFillDelete 
                            size={20}
                            onClick={ () => handleDelete(props.note.id) } 
                        />
                    </div>
                </div>
                <textarea
                    defaultValue={props.note.notes}
                />
                <span>
                    <AiOutlineExclamationCircle 
                        size={20}
                        onClick={ () => handleChangePriority(props.note.id) } 
                    />
                </span>
            </li>
        </>
    );
}
