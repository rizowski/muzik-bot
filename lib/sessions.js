

const cache = {};

export default {
  saveSession(user, channel, discord){
    const key = `${user.id}:${channel.id}`;
    cache[key] = { user, channel, discord };
    return key;
  },
  getSession(userId, channelId){
    const key = `${userId}:${channelId}`;

    return cache[key];
  }
};
