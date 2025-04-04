import { AiFillDelete, AiOutlineExclamationCircle } from "react-icons/ai";

import "./styles.css";
import "./styles-priority.css";

export default function Notes() {
    return (
        <>
            <li className="notepad-infos">
                <div>
                    <strong>Supermercado</strong>
                    <div>
                        <AiFillDelete 
                            size={20}
                        />
                    </div>
                </div>
                <textarea
                    defaultValue={"Comprar pão, manteiga, chocolate e arroz."}
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
