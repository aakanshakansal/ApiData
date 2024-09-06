// Assigns a default name to each player, based on the number of visitors seen in this session
class Names {
    setup() {
        // remember all viewIds ever seen in this session
        this.visitors = new Set();

        this.subscribe("playerManager", "create", "onPlayerCreated");

        for (const player of this.service("PlayerManager").players) {
            this.onPlayerCreated(player);
        }
    }

    onPlayerCreated(player) {
        if (!this.visitors.has(player.playerId)) {
            this.visitors.add(player.playerId);
            player.set({ name: `Visitor ${this.visitors.size}` });
        }
    }

    // TODO: remove player from visitors (perhaps after an hour of inactivity)
}

// shows the name of our player and allows to change it
class NameEditor {
    setup() {
        this.player = this.actor.service("PlayerManager").player(this.viewId);

        this.input = document.getElementById("nameInput");
        if (!this.input) {
            const div = document.createElement("div");
            div.innerHTML =
                `<div style="
                    z-index: 1;
                    position: absolute;
                    bottom: 7px;
                    right: 10px;
                    white-space: nowrap;
                    padding: 8px;
                    color: white;
                    text-shadow: 2px 2px 2px rgb(0 0 0 / 50%);
                    /* border-radius: 8px; */
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 8px 8px 0px 0px;
                ">
                    <p style="
                    font-size: 12px;
                    margin: 0;
                    ">
                    Name 
                    </p>
                <input type="text" id="nameInput" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="
                background-color: rgb(60, 60, 60);
                font-size: smaller;
                width: 100px;
                border-left: none;
                border-right: none;
                border-top: none;
                color: white;
                padding: 5px;
                opacity: 0.5;
                "/></div>`;
            const wrapper = div.firstChild;
            const input = div.querySelector("#nameInput");

            for (const event of [ "keydown", "keyup",
                "click", "mousedown", "mouseup", "mousemove", "wheel",
                "touchstart", "touchend", "touchmove", "touchcancel",
                "pointerdown", "pointerup", "pointermove", "pointercancel",
            ]) {
                wrapper[`on${event}`] = event => event.stopPropagation();;
            }
            input.onfocus = () => {
                input.style.opacity = "100%";
                input.select();
            };
            input.onblur = () => {
                input.style.opacity = "50%";
            };
            document.body.appendChild(wrapper);
            this.input = input;
        }

        // since we use "publish" here, "onchange" needs to be set every time (coming back from dormancy)
        this.input.onchange = () => {
            this.publish(this.player.id, "_set", { name: this.input.value });
            this.input.select();
        };

        this.subscribe(this.player.id, "nameSet", "showName");
        this.showName();
    }

    showName() {
        this.input.value = this.player._name;
    }
}

export default {
    modules: [
        {
            name: "Names",
            actorBehaviors: [ Names ],
            pawnBehaviors: [ NameEditor ]
        }
    ]
}