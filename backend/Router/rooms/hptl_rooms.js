const express = require('express');

const {roomGet,roomPost,roomUpdate,roomDelete} =require('../../Controller/hptl_rooms/rooms')


const room =express.Router();

room.get('/hptl/room',roomGet);
room.post('/hptl/room',roomPost);
room.put('/hptl/room/:room_id',roomUpdate);
room.delete('/hptl/room/:room_id',roomDelete);


module.exports={room};