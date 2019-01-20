import {autobind} from "core-decorators";
import React from "react";
import {observer} from "mobx-react";
import {CommentsStore} from "./CommentsStore";
import {Button} from "../../../../../button/Button";
import {Utils} from "../../../../Utils";
import "./Comments.scss";

@autobind
@observer
class Comments extends React.Component {
    store = new CommentsStore();

    componentWillMount() {
        this.store.id = this.props.taskId;
        this.store.getComments().then(console.log);
        Utils.getCurrentUserInfo().then(data =>
            this.store.id_user = data.id_user
        )
    }

    onChangeComment(event) {
        this.store.text = event.target.value;
    }

    onUpdate(item) {
        if (item.id_user === this.store.id_user) {
            this.store.updated = true;
            this.store.edited = item.text;
            this.store.edited_id = item.id_comment;
        }
    }

    onUpdateComment(event) {
        this.store.edited = event.target.value;
    }

    render() {
        return (
            <div className={"comments"}>
                <div>
                    {this.store.comments.map((item, index) =>
                        <div key={index} className={"comment"}>
                            <img alt="1" className={"preview"} src={item.photo}/>
                            <div>
                                <div className={"name"}>
                                    <span>{item.first_name} {item.last_name}</span>
                                </div>
                                <p
                                    className={"comment__text"}
                                    onClick={() => this.onUpdate(item)}
                                >{item.text}
                                </p>
                            </div>
                            {item.id_user === this.store.id_user
                                ? <div className={"comment__delete"}
                                       onClick={() => this.store.onDelete(item.id_comment)}/>
                                : void 0
                            }
                        </div>
                    )}
                </div>
                <div>
                    {
                        !this.store.updated
                            ? <textarea
                                placeholder={"Add your comment"}
                                onChange={this.onChangeComment}
                                value={this.store.text}
                            />
                            : <textarea
                                onChange={this.onUpdateComment}
                                value={this.store.edited}
                            />
                    }
                    <Button text={"save"} onClick={this.store.saveComment}/>
                </div>
            </div>
        )
    }
}

export {Comments};