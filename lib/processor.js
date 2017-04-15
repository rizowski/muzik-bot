import emitter from './emitter';
import yt from './sources/youtube';
import Promise from 'bluebird';
import _ from 'lodash';

function handleError(err){
  console.error(err);
}

emitter.on('process:playlist', ({ id, discord }) => {
  yt.playlist(id)
    .then((ids) => {
      return Promise.map(ids, (id) => {
        return yt.info(id)
          .then((info) => ({ info, id }));
      });
    })
    .then((datas) => {
      _.each(datas, (data) => {
        emitter.emit('queue:song', { info: data.info, id: data.id, discord });
      });
    }).catch(handleError);
});

emitter.on('process:video', ({ id, discord }) => {
  yt.info(id)
    .then((info) => {
      emitter.emit('queue:song', { info, id, discord });
    }).catch(handleError);
});

emitter.on('process:term', ({ terms, discord }) =>{
  yt.search(terms)
    .then((id) =>{
      return yt.info(id)
        .then((info) => {
          emitter.emit('queue:song', { id, info, discord });
        });
    }).catch(handleError);
});
