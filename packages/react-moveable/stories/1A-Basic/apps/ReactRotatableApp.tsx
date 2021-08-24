import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const [translate, setTranslate]  = React.useState([0, 0]);
    const [rotate, setRotate]  = React.useState(0);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

    const { width = 100, height = 100 } = moveableRef.current?.moveable.state ?? {};
    const handleClick = () => {
        moveableRef?.current?.request("rotatable", { deltaRotate: 45 }, true);
    }

    return (
        <div className="root">
            <div className="container">
                <div onClick={handleClick}>Click!!</div>
                <div className="target" ref={targetRef} style={{
                    transform: `rotate(${0}deg)`,
                }}>100,100<br/>{width}x{height}</div>
                <Moveable
                    ref={moveableRef}
                    target={targetRef}
                    resizable={true}
                    draggable={true}
                    keepRatio={true}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    canFlip={true}
                    onResizeFlip={data => {}}
                    onRotateStart={e => {
                        e.set(rotate);
                        e.dragStart && e.dragStart.set(translate);
                    }}
                    onRotate={e => {
                        const beforeTranslate = e.drag.beforeTranslate;
                        const rotate = e.rotate;

                        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${rotate}deg)`;
                    }}
                    onRotateEnd={e => {
                        const lastEvent = e.lastEvent;

                        if (lastEvent) {
                            setTranslate(lastEvent.drag.beforeTranslate);
                            setRotate(lastEvent.rotate);
                        }
                    }}
                    onResizeStart={e => {
                        e.dragStart && e.dragStart.set(translate);
                    }}
                    onResize={e => {
                        const beforeTranslate = e.drag.beforeTranslate;

                        e.target.style.width = `${e.width}px`;
                        e.target.style.height = `${e.height}px`;
                        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${rotate}deg)`;
                    }}
                    onResizeEnd={e => {
                        const lastEvent = e.lastEvent;

                        if (lastEvent) {
                            setTranslate(lastEvent.drag.beforeTranslate);
                        }
                    }}
                    onDragStart={e => {
                        e.set(translate);
                    }}
                    onDrag={e => {
                        e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px) rotate(${rotate}deg)`;
                    }}
                    onDragEnd={e => {
                        const lastEvent = e.lastEvent;

                        if (lastEvent) {
                            setTranslate(lastEvent.beforeTranslate);
                        }
                    }}
                />
            </div>
        </div>
    );
}
