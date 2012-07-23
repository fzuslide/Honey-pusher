// Generated by CoffeeScript 1.3.3
(function() {
  var justMsg, publish;

  justMsg = function(req, res) {
    return res.send('Honey Pusher publish API');
  };

  publish = function(req, res, io) {
    /*
        Subscribe:
            project: 'project name. eg: ihunantv'
            channel: 'channel name. eg: a movie id'
            body: 'message body'
    
        Message:
            project: 'project name. eg: ihunantv'
            from: 'msg send from who'
            to: 'msg send to who'
            body: 'message body'
    */

    var data, room;
    data = req.body;
    if (data.project) {
      /*
              Get room name
      */

      if (data.type === 'subscribe') {
        room = "" + data.project + ":channel:" + data.channel;
      } else {
        room = data.to ? "" + data.project + ":" + data.to : data.project;
      }
      io.sockets["in"](room).emit(data.type, data);
    }
    return res.send(req.body);
  };

  module.exports = function(app, io) {
    app.get('/pub', justMsg);
    return app.post('/pub', function(req, res) {
      return publish(req, res, io);
    });
  };

}).call(this);
