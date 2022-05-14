import { createRoot } from "react-dom/client";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {useState} from "react";

const categories = [
  {id: "1", name: 'Todo'},
  // {id: "2", name: 'Doing'},
]

const tasks = [
  {id: "1" , name: 'Work out', category: "1"},
  {id: "2", name: 'Go to sleep', category: "1"}
]

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const {source, destination} = result;
  const column = [source.droppableId];
  const copiedItems = [...column.items];
  const removed = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);
}

const App = () => {


  const [columns, setColumns] = useState(categories);

  return (
    <div className="drag-drop-context">

      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <Droppable droppableId={"1"}>
          { (provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{
                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                padding: 4,
                width: 250,
                minHeight: 500
              }}>

                <Draggable key={"1"} draggableId={"1"} index={1}>
                  {(provided, snapshot) => {
                    return (
                      <div ref={provided.innerRef}
                           {...provided.droppableProps}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           style={{
                             userSelect: 'none',
                             padding: 16,
                             color: 'white',
                             margin: 1,
                             backgroundColor: snapshot.isDragging? 'green' : 'black',
                             ...provided.draggableProps.style
                           }}>
                        ITEM 1
                      </div>
                    )
                  }}
                </Draggable>
                <Draggable key={"2"} draggableId={"2"} index={2}>
                  {(provided, snapshot) => {
                   return (
                      <div ref={provided.innerRef}
                           {...provided.droppableProps}
                           {...provided.draggableProps}
                           {...provided.dragHandleProps}
                           style={{
                             userSelect: 'none',
                             padding: 16,
                             color: 'white',
                             margin: 1,
                             backgroundColor: snapshot.isDragging? 'green' : 'black',
                             ...provided.draggableProps.style
                           }}>
                        ITEM 2
                      </div>
                    )
                  }}
                </Draggable>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
};

createRoot(document.getElementById("root")).render(<App />);
