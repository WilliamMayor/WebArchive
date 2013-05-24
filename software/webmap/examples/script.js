var APP = {
  init: function() {
    APP.build("mf");
    APP.build("sec");
  },
  wrap: function(arg, func) {
    return function(event) {
      return func(event, arg);
    };
  },
  build: function(name) {
    sigInst = APP.sigmaInit(name);
    sigInst.parseGexf('/software/webmap/examples/' + name + '.gexf');
    sigInst.bind('overnodes', APP.wrap(sigInst, APP.overnodes));
    sigInst.bind('outnodes', APP.wrap(sigInst, APP.outnodes));
    sigInst.draw();
  },
  sigmaInit: function(name) {
    return sigma
      .init(document.getElementById(name))
      .drawingProperties({
        defaultLabelColor: '#fff',
        defaultLabelSize: 12,
        defaultLabelBGColor: '#fff',
        defaultLabelHoverColor: '#000',
        labelThreshold: 20,
        defaultEdgeType: 'curve',
        edgeColor: 'white'})
      .graphProperties({
        minNodeSize: 0.5,
        maxNodeSize: 5,
        minEdgeSize: 1,
        maxEdgeSize: 1})
      .mouseProperties({
        maxRatio: 4
      });
  },
  outnodes: function(event, inst) {
    inst.iterEdges(function(e){
      e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
      e.attr['grey'] = 0;
    }).iterNodes(function(n){
      n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
      n.attr['grey'] = 0;
    }).draw(2,2,2);
  },
  overnodes: function(event, inst) {
    var nodes = event.content;
    var neighbors = {};
    inst.iterEdges(function(e){
      if(nodes.indexOf(e.source)<0 && nodes.indexOf(e.target)<0){
        if(!e.attr['grey']){
          e.attr['true_color'] = e.color;
          e.color = "rgba(0, 0, 0, 0)";
          e.attr['grey'] = 1;
        }
      }else{
        e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
        e.attr['grey'] = 0;
        neighbors[e.source] = 1;
        neighbors[e.target] = 1;
      }
    }).iterNodes(function(n){
      if(!neighbors[n.id]){
        if(!n.attr['grey']){
          n.attr['true_color'] = n.color;
          n.color = '#666';
          n.attr['grey'] = 1;
        }
      }else{
        n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
        n.attr['grey'] = 0;
      }
    }).draw(2,2,2);
  }
};
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", APP.init, false);
} else {
  window.onload = APP.init;
}