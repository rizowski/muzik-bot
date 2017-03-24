import emitter from './emitter';
import yt from './sources/youtube';
import Promise from 'bluebird';
import _ from 'lodash';

function handleError(err){
  emitter.emit('error', err);
}

emitter.on('process:playlist', ({ id, channel, message }) => {
  yt.playlist(id)
    .then((ids) => {
      return Promise.map(ids, (id) => {
        return yt.info(id)
          .then((info) => ({ info, id }));
      });
    })
    .then((datas) => {
      _.each(datas, (data) => {
        emitter.emit('queue:song', { info: data.info, id: data.id, channel, message });
      });
    }).catch(handleError);
});

emitter.on('process:video', ({ id, channel, message }) => {
  yt.info(id)
    .then((info) => {
      emitter.emit('queue:song', { info, id, channel, message });
    }).catch(handleError);
});

emitter.on('process:term', ({ terms, channel, message }) =>{
  yt.search(terms)
    .then((id) =>{
      return yt.info(id)
        .then((info) => {
          emitter.emit('queue:song', { id, info, channel, message });
        });
    });
});
