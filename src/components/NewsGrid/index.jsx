import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import NewsCard from "../NewsCard";
import {useStockNews} from "../../contexts/useStockNews";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"

const NewsGrid = () => {
    const {newsSelections} = useStockNews();
    const {reorderNews} = useStockNews();

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    return (
        <DragDropContext onDragEnd={(result) => {
            const {source, destination} = result;
            if (!destination) {
                return;
            }
            if (source.index === destination.index && source.droppableId === destination.droppableId) {
                return;
            }
            reorderNews(reorder(newsSelections, source.index, destination.index))
        }}>
            <Droppable droppableId="newsGrid">
                {(droppableProvided) => (
                    <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}>
                        <SimpleGrid
                            columns={{base: 1, sm: 2, md: 3, lg: 4}}
                            spacing={3}>
                            {
                                newsSelections.map((source, index) => (
                                    <Draggable key={source.id} draggableId={source.id} index={index}>
                                        {(draggableProvided) => (
                                            <div
                                                {...draggableProvided.draggableProps}
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.dragHandleProps}>
                                                <NewsCard
                                                    key={source.id}
                                                    source={source.name}/>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                        </SimpleGrid>
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default NewsGrid;
