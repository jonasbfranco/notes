import { AiFillDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import "./styles.css";
import "./styles-priority.css";
import { useState } from "react";
import api from "@/services/api";

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

    const [changeNote, setChangeNote] = useState("");


    function handleEdit(e: HTMLTextAreaElement, priority: boolean) {
        e.style.cursor = "text";
        e.style.borderRadius = "5px";

        if (priority) {
            e.style.boxShadow = "0 0 5px #8249d2"
        } else {
            e.style.boxShadow = "0 0 5px #dbdbdb"
        }
    };

    
    async function handleSave(e: HTMLTextAreaElement, notes: string) {
        e.style.cursor = "default";
        e.style.boxShadow = "none";

        if (changeNote && changeNote !== notes) {
            await api.put(`/contents/${props.note.id}`, {
                notes: changeNote,
            })
        }
        setChangeNote("");
    };


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
                    onClick={ (e) => handleEdit(e.target, props.note.priority) }
                    onChange={ (e) => setChangeNote(e.target.value) }
                    onBlur={ (e) => handleSave(e.target, props.note.notes) }

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
