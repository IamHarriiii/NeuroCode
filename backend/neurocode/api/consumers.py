import json
from channels.generic.websocket import AsyncWebsocketConsumer

class CodeEditorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.session_id = self.scope['url_route']['kwargs']['session_id']
        self.room_group_name = f'code_{self.session_id}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'code_update',
            'code': data['code'],
            'user': data.get('user'),
            'cursor': data.get('cursor')
        })

    async def code_update(self, event):
        await self.send(text_data=json.dumps({
            'code': event['code'],
            'user': event['user'],
            'cursor': event['cursor']
        }))