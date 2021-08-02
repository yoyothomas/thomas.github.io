(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"movie_atlas_1", frames: [[546,0,1108,261],[546,263,1108,261],[0,546,492,472],[1520,526,427,439],[1034,978,396,396],[546,526,486,486],[0,0,544,544],[494,1014,483,214],[0,1020,484,89],[1034,526,484,450],[1656,0,166,344],[1520,967,292,561]]},
		{name:"movie_atlas_2", frames: [[1402,867,533,794],[0,0,1358,1333],[1402,0,539,865],[0,1335,699,686],[701,1335,699,686]]},
		{name:"movie_atlas_3", frames: [[0,0,2000,1400]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_48 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["movie_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["movie_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["movie_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["movie_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib._2662602 = function() {
	this.initialize(ss["movie_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.lefthandai = function() {
	this.initialize(ss["movie_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.righthandai = function() {
	this.initialize(ss["movie_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween47 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(-277.05,-65.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277,-65.2,554,130.5);


(lib.Tween46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-277.05,-65.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-277,-65.2,554,130.5);


(lib.Tween43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC957C").s().p("EgmCAHQQgDgGgBgIQgDgdAYg4QAehIgFgjQgEgbgbgKQgPgGgggGQgYgIAAgXQAAhtBNhNQAQgQAfAKQAlAPATAGQAgALASgQQAYgTAKhEQAKhEAYgKQATgIAfAgQAUAUAkAyQAjAxAMAMIAVATIAiAeQAqAkASAXQA7BHhhAHQg1AEgRAXQgNARAGAiIAMA7QAEAhgQARQgMAMgNAKQhGA3hcAAQgTAAg1ARIgGACQg2ARgVADIgPABQgcAAgIgSgAerG4QgGgogjgRQgZgMg1gEQhJgHgRgDQgxgJgagaQgYgYAOguQAYg2AJgcQAPgwgYgcQgegmhlgRQhmgSgOgjQgMgfAvguQAegdBMg1QBKg0ASgSQAZgZA0APQA/AZAfAIQA1AQAagXQAhgfABhnQABhQAUgbQAGgIAHgDQAcgMAzAwQAhAfA7BKIABABQA+BPAPAPIBhBWQA/A4AjAlIAOAPQBdBqh+gJQgZgCghgHQhvgVghAcQgZAWASA8QAJAbAUA2IAKAbQATA+gZAYIggAfQhFBBg/AkQgwAcgdAAQgjAAgHgqg");
	this.shape.setTransform(12.2619,-2.841);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA9584").s().p("AEQGWQgzgBhfgNIg6gHIAFgCQA1gRATAAQBdAABGg3QA5AtgBAYQgCAahOAAIgMAAgAkBEQQhqhqAAiWQAAiVBqhrQAXgXAwgBIBXADQAxABAWgOQAdgTgBg1QgEhkBmBFQA5AmBkBjIARARQA+BHATBYIgVgUQgMgMgjgxQgjgygUgUQgfgggUAIQgYAKgKBEQgJBEgYAUQgTAQgggLQgSgGglgQQgegKgQAQQhNBOAABsQAAAXAYAIQAgAGAPAGQAaAKAEAbQAGAjgeBIQgYA4ADAdQhwgShUhUg");
	this.shape_1.setTransform(-225.3981,4.7785);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(236,149,124,0.498)").s().p("ACBIuIibgIQgvAAgog1QgNgQgUgiQgXglgKgOQgog5gugIQg8gJhaBDQhbBEgtgZQglgUgGhXQgEg7AKhyQAMiAAAgYQAAjjChiiQAhghBHAhQATAJAsAZQApAXAWAKQBIAeAkglQAvgyAEirQBEgYAZAjQAJAMAHAbIABAEQgUAagBBRQAABmgiAfQgZAXg1gPQgegJg/gYQg1gPgYAYQgSAShLA0QhMA1gdAdQgwAvAMAeQAOAlBnARQBkARAfAlQAXAdgPAwQgIAbgYA3QgPAtAZAZQAZAZAyAKQAQADBJAGQA2AFAXAMQAjARAGAnQAMBNBsg+QA+glBGhAQAQAeAgAiQCICUjBAUQghAEguAAQgrAAg3gDgAE6BkQgSg8AZgWQAggcBvAVQAhAGAZACQgJAmgsAjQggAZhKAuQgMAJgJAIQgUg1gIgbgAG7i6IhghWQgPgPg+hOIgCgCQAqgGA1gQQCMgqA3AfQAtAZgIBPQgFAsgiBvIgOAxQgjgmhAg4g");
	this.shape_2.setTransform(202.225,0.0271);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-261.8,-56,523.7,112.1);


(lib.Tween42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EC957C").s().p("EgmCAHQQgDgGgBgIQgDgdAYg4QAehIgFgjQgEgbgbgKQgPgGgggGQgYgIAAgXQAAhtBNhNQAQgQAfAKQAlAPATAGQAgALASgQQAYgTAKhEQAKhEAYgKQATgIAfAgQAUAUAkAyQAjAxAMAMIAVATIAiAeQAqAkASAXQA7BHhhAHQg1AEgRAXQgNARAGAiIAMA7QAEAhgQARQgMAMgNAKQhGA3hcAAQgTAAg1ARIgGACQg2ARgVADIgPABQgcAAgIgSgAerG4QgGgogjgRQgZgMg1gEQhJgHgRgDQgxgJgagaQgYgYAOguQAYg2AJgcQAPgwgYgcQgegmhlgRQhmgSgOgjQgMgfAvguQAegdBMg1QBKg0ASgSQAZgZA0APQA/AZAfAIQA1AQAagXQAhgfABhnQABhQAUgbQAGgIAHgDQAcgMAzAwQAhAfA7BKIABABQA+BPAPAPIBhBWQA/A4AjAlIAOAPQBdBqh+gJQgZgCghgHQhvgVghAcQgZAWASA8QAJAbAUA2IAKAbQATA+gZAYIggAfQhFBBg/AkQgwAcgdAAQgjAAgHgqg");
	this.shape.setTransform(12.2619,-2.841);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA9584").s().p("AEQGWQgzgBhfgNIg6gHIAFgCQA1gRATAAQBdAABGg3QA5AtgBAYQgCAahOAAIgMAAgAkBEQQhqhqAAiWQAAiVBqhrQAXgXAwgBIBXADQAxABAWgOQAdgTgBg1QgEhkBmBFQA5AmBkBjIARARQA+BHATBYIgVgUQgMgMgjgxQgjgygUgUQgfgggUAIQgYAKgKBEQgJBEgYAUQgTAQgggLQgSgGglgQQgegKgQAQQhNBOAABsQAAAXAYAIQAgAGAPAGQAaAKAEAbQAGAjgeBIQgYA4ADAdQhwgShUhUg");
	this.shape_1.setTransform(-225.3981,4.7785);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(236,149,124,0.498)").s().p("ACBIuIibgIQgvAAgog1QgNgQgUgiQgXglgKgOQgog5gugIQg8gJhaBDQhbBEgtgZQglgUgGhXQgEg7AKhyQAMiAAAgYQAAjjChiiQAhghBHAhQATAJAsAZQApAXAWAKQBIAeAkglQAvgyAEirQBEgYAZAjQAJAMAHAbIABAEQgUAagBBRQAABmgiAfQgZAXg1gPQgegJg/gYQg1gPgYAYQgSAShLA0QhMA1gdAdQgwAvAMAeQAOAlBnARQBkARAfAlQAXAdgPAwQgIAbgYA3QgPAtAZAZQAZAZAyAKQAQADBJAGQA2AFAXAMQAjARAGAnQAMBNBsg+QA+glBGhAQAQAeAgAiQCICUjBAUQghAEguAAQgrAAg3gDgAE6BkQgSg8AZgWQAggcBvAVQAhAGAZACQgJAmgsAjQggAZhKAuQgMAJgJAIQgUg1gIgbgAG7i6IhghWQgPgPg+hOIgCgCQAqgGA1gQQCMgqA3AfQAtAZgIBPQgFAsgiBvIgOAxQgjgmhAg4g");
	this.shape_2.setTransform(202.225,0.0271);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-261.8,-56,523.7,112.1);


(lib.Tween17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._2662602();
	this.instance.setTransform(-1000,-700);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1000,-700,2000,1400);


(lib.righthand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.righthandai();
	this.instance.setTransform(0,0,0.41,0.41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.righthand, new cjs.Rectangle(0,0,286.6,281.3), null);


(lib.lefthand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lefthandai();
	this.instance.setTransform(0,0,0.41,0.41);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lefthand, new cjs.Rectangle(0,0,286.6,281.3), null);


(lib.leaf3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(0,0,0.1574,0.1574);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.leaf3, new cjs.Rectangle(0,0,83.9,125), null);


(lib.leaf2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#BBE50C").s().p("EgEeAsnQhdg9grhMQguhTAFh2QABhSAshiQAohVA9hMQATg2AKgkQhABFhBATQhAAVg0gLQgvgKgvgnQgRgOgRgSQAOABAUgDQAhgGA1gFIBvgNQBKgKA6gcQANgFAQgJQAfhsAfh3IAMgtQAwixApivQg6Byg+A+QhKBKhyAmQiAAriagFQilgGhhg9QAbhvBzh3QBrhvB6g6QByg2BuAEQBZAECGAwIA+AUIAhiVQgOg6gBgyQgDhOAYg/QAVg3Avg6IAli/IgDgOQgQhMgMhGQgQBLgvAqQg0AwhCAOQg7AOhUgMQghgFgdgHQARgGARgLQAfgVA1geIBvg/QBIgrAogzQAQgUANgZQgwlCgVmvQgUBBg3A5Qg9A/haArQhhAuhKgGQgRhIAehnQAdhgA1hGQAxhBBBgfQA1gZBagMIAlgGIgCg3QgGjZADikQgwBwhLBVQhUBhhhAiQiJA0iDgeQh3gciKhmQgvgkg1guQAoABAmgGQBJgPB9gNQC1gTBLgKQBMgLBKgYQBQgZA6giQA8ggAzgyQAGijAQidIgcgHQgigJgjgNQAVgHATgLQAZgQAqgYQAViiAeiPIgEAJQgfA+gfAfQgnAng7ATQhAAUhMgEQhRgEgwgfQAPg2A6g6QA1g2A9gcQA5gaA2ADQAtADBBAZIAhAMQAsi4A9iiQBMjLA6iAQBPitBLhqQAHgJAMgCQAMgCAKAGQAKAHACAMQACAMgHAKQhYB7hdDcIADAIQAZBUANCbQA+AWAsAiQAwAmAmA9QA0BWAVBvQAWB4gbBQQg2gBhBgcQg8gZg6gsQACBOAAA6QAeAGAfADQBoANA8AcQBKAhA5BKQA9BPAhBtQAkB0gTBSQgxAFg+gRQg6gQg8ghIgnASQh+A1hegJIgLCOQAYA0AgAmQAhAsA0ArQAwAoA0AeQAuAZCEBDQBWArAxAhQAaAPAeAJQguAZguAUQh8A0hcgHQhmgIhWhRQgwgrgihKQgfhDgQhVQgfFqgrFJQBjAaBaBOQBXBMBCBuQBIB3ADBYQhXASiEgqQh7gmhfhDIgdgWIgMBNQgRBkgXCDQA0AqAzAcQA6AgBKAaQBHAYBFAMQBCALCnAYQBxAQBEAQQAlAHAhAAQglAmgoAhQhrBXhmAUQhwAXiDg0QhigjhhhmQhUhYg7huQAJAkAUA6IAUBBQA9BJAXA8QAcBIgIBZQgJBjgxBnQg1BthFAwQhAgxgshpQgnCvgzDJIAfAMQBbAjAxAnQA9AwAkBSQAmBXAGBrQAHB0gkBIQhQgMhahJQhThEgxhRQgkg9gKg7QhCD2gjBgQAMAZARAWQAmAwA9AmIBdA0QAtAZAaASQAPAKAOAFIgvAUQg+AWgwgHQg1gIgugsQghgegVg4QgTgxgGg5IgFAMQgJA2AABDQABA+AIA7IAjDDQASBeAGA7QADAdAKAdQglgSglgYgABeGmIApj2Qg9g/gihfQAWDbAgC5gAAZiPQAVABAWAAQBAABAuAHQA8nUAnoYQhBgVg9g4QgxgrgihNQgfhFgPhXIgFgBQgeExAKGiIAUABQAqACAZAIQAfALAZAcQAcAdARAqQATAugFAhQghAGgugQQgsgPgegaQglgegKgvQAIE/ASDrgAGg05QgwhAgNhVIgEB0IBBAhIAAAAgADi4XQgmAigrARQA9A7BIApIAQAIQAGiIgCiQQgYBPgwAqgAAm52IAMAYQAxgZAbgQQAlgVAigbQAkgeAXgdQAXgcAQggIgBgSQgdgcgWgcQg0hBgRhHQgOg8AHhVQhXD7gqEggEAEPgjnQgIhWgKg1IgwB6IApALIAZAGIAAAAg");
	this.shape.setTransform(33.3749,97.2235,0.3354,0.3354,0,-179.9009,0.0991);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.leaf2, new cjs.Rectangle(0,0,66.8,194.4), null);


(lib.hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-2.95,-3,0.2662,0.2662);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand, new cjs.Rectangle(-2.9,-3,361.4,354.8), null);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#D7ED00","#FFFFFF"],[0.443,0.506],0,0,0,0,0,9.2).s().p("AgVBZQglgIgUghQgUghAJgkQAKglAggUQAhgUAkAJQAlAKAUAgQAUAhgJAkQgKAlggAUQgXAOgYAAQgKAAgMgEg");
	this.shape.setTransform(9.225,9.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,18.5,18.5), null);


(lib.Group_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(0,0,0.2256,0.2256);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_8, new cjs.Rectangle(0,0,111,106.5), null);


(lib.Group_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(0,0,0.2524,0.2524);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_5, new cjs.Rectangle(0,0,107.8,110.8), null);


(lib.flower7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#ACDB00"],[0.624,0.651],0,0,0,0,0,4.9).s().p("AgMAvQgUgFgKgSQgJgSAFgSQAGgUARgKQASgJASAFQAUAGAKARQAKASgGATQgGATgRAKQgMAGgMAAQgFAAgHgCg");
	this.shape.setTransform(36.7367,37.9967);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCFFF0").s().p("ABeFxQgfgDgVgNQgbgTgUgrQgNgagDgMQgFgTgEgaQgKAZgJARQgFAKgTAXQgfAlgfALQgXAIgfgEQg5gHAFhCQhAAKgMg4QgGgeAHgYQAJggAighQAVgVAKgGQAVgNATgJQgagCgTgDQgKgCgdgLQgsgSgVgZQgOgUgGgfQgLg4BAgPQgdg6AxgcQAcgQAYgBQAhgBAqAWQAbAOAIAHQASAQAPAQQgFgVgEgYQgBgNACgcQADgwATgbQAOgUAbgPQAxgcAiA4QAvgtAqAmQAXAVAJAXQALAfgIAvQgGAegEAKQgJAXgKASQAbgQANgGQAJgFAegHQAugMAgAJQAYAHAWAWQAYAWgDAZQgDATgTAXQA6AegXAzQgNAcgTAPQgbAVgvAHQgbAEgOgBQgXgCgWgEQAOALAUAUQAGAHARAaQAZApACAhQAAAZgNAcQgOAegZAEQgTADgbgLQgJA7gwAAIgKgBg");
	this.shape_1.setTransform(37.3581,37.0019);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower7, new cjs.Rectangle(0,0,74.8,74), null);


(lib.flower6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#ACDB00"],[0.624,0.651],0,0,0,0,0,4.9).s().p("AgPAuQgUgHgIgSQgJgSAHgSQAGgUATgIQASgJASAHQATAGAJATQAJASgHASQgHATgSAJQgKAFgLAAQgHAAgIgDg");
	this.shape.setTransform(36.2582,38.2582);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCFFB8").s().p("ABGF0QgfgFgTgPQgagUgSgsQgMgbgCgMQgEgTgCgaQgLAWgKASQgGAKgVAWQghAjgfAJQgYAHgfgGQgfgGgLgXQgIgRADgdQhBAGgIg5QgEgfAIgXQAKgfAlggQAWgTAKgFQAPgJAagLQgagDgTgFQgKgCgbgNQgsgUgTgbQgNgUgEgfQgEghASgRQAOgNAdgFQgag8AzgaQAcgNAYAAQAiABApAYQAZAQAIAIQAPANARAUIgHgtQgBgNAEgcQAGgwAVgaQAOgTAdgOQAygYAfA6QAxgrAoAoQAWAXAHAXQAKAggLAuQgGAbgGANQgIARgOAXQAVgMAUgIQANgFAbgFQAvgJAfALQAXAIAWAXQAWAYgEAYQgEATgUAWQA4AhgbAxQgPAcgTAOQgcATgvAEQgfACgKgBQgVgCgYgGQAPAOARATQAIAJANAZQAXAqgBAiQAAAXgPAcQgQAdgZADQgTADgbgNQgMA3grAAIgPgBg");
	this.shape_1.setTransform(37.0651,37.3288);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower6, new cjs.Rectangle(0,0,74.2,74.7), null);


(lib.flower5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(0,0,0.1866,0.1866);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower5, new cjs.Rectangle(0,0,73.9,73.9), null);


(lib.flower4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-0.25,-0.05,0.2372,0.2372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower4, new cjs.Rectangle(-0.2,0,115.2,115.2), null);


(lib.flower1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(0,0,0.1651,0.1651);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower1, new cjs.Rectangle(0,0,89.9,89.9), null);


(lib.coil = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(0,0,0.1935,0.1935);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.coil, new cjs.Rectangle(0,0,104.3,167.4), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#FFFFFF","#FFFFFF"],[0,0.09,1],-19.7,0,19.8,0).s().p("AjFFEIAAreIGLAAIAAM1QjygiiZg1g");
	this.shape.setTransform(19.75,41.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,39.5,82.3), null);


(lib.bottles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(0,0,0.32,0.32);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bottles, new cjs.Rectangle(0,0,53.2,110.1), null);


(lib.bottlel = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(0,0,0.2168,0.2168);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bottlel, new cjs.Rectangle(0,0,63.3,121.6), null);


(lib.Tween45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.righthand();
	this.instance.setTransform(0,0.05,2.5258,2.5258,0,180,0,143.3,140.6);

	this.instance_1 = new lib.lefthand();
	this.instance_1.setTransform(0,0.05,2.5258,2.5258,0,180,0,143.3,140.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-361.9,-355.2,723.9,710.4);


(lib.Tween44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.righthand();
	this.instance.setTransform(0,0.05,2.5258,2.5258,0,180,0,143.3,140.6);

	this.instance_1 = new lib.lefthand();
	this.instance_1.setTransform(0,0.05,2.5258,2.5258,0,180,0,143.3,140.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-361.9,-355.2,723.9,710.4);


(lib.Tween22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.flower5();
	this.instance.setTransform(7.9,34.5,2.6789,2.6789,0,0,0,37.1,37.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-91.5,-65.1,198,197.9);


(lib.flower3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Group_5();
	this.instance.setTransform(62.75,60.8,1,1,0,0,0,53.9,55.4);
	this.instance.alpha = 0.5;
	this.instance.compositeOperation = "multiply";

	this.instance_1 = new lib.Path_3();
	this.instance_1.setTransform(58.65,62.55,1,1,0,0,0,9.2,9.2);
	this.instance_1.compositeOperation = "multiply";

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FDFFEE").s().p("AgMJbQhFgUg1hCIgMgRIgSAJQhOAihGgOQg7gMgngqQgegfgLgJQgKgHgMgCIgngGIAAgoQABgMgGgLQgHgNgagjQgXgfgJgoQgJgtALgvQALgrAbgpIANgRQgMgLgDgEQgtgxgOg4QgMgxALguQAFgVALgWQAYgrAEgOQACgJgCgJIgGgnIAmgMQALgDAJgJQAKgKAZgkQAhgvA5gUQBDgYBRAWIAUAHIAJgTQArhIBCgeQA3gZA2AKQAqAIAQABQALAAALgGIAjgSIAYAhQAHAKAKAFQAOAHApANQA2AQAlAwQAsA4AEBVIgBAVIAVADQBSASAxA1QApAsAHA4QAFArAFAPQADALAIAIIAdAdIgYAgQgGAGgCAIQgDAOAAAyQABAUgGAZQgLAvgiAlQgnArg/AYIgUAGIAEAUQAFAxgLArQgMAwgdAjQgaAfgjARQgoATgMAIQgKAHgFALIgSAkIgmgNQgLgEgMACQgPACgpAOQgcAKgdAAQgbAAgagIg");
	this.shape.setTransform(61.0495,61.082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower3, new cjs.Rectangle(0,0,122.1,122.2), null);


(lib.flower2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Group_8();
	this.instance.setTransform(31.8,30.75,0.522,0.522,0,0,0,56.4,53.6);
	this.instance.alpha = 0.8281;
	this.instance.compositeOperation = "multiply";

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#D7ED00","#FFFFFF"],[0.443,0.506],0,0,0,0,0,9.2).s().p("Ag/BDQgcgagBgnQAAglAagcQAagbAmgBQAlgBAcAaQAcAaABAnQABAlgaAcQgbAcgmAAIgCAAQgkAAgbgZg");
	this.shape.setTransform(32.0313,32.7394,0.5219,0.5219);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF252").s().p("AjzJGQglgWgPgGQgLgEgLABIgoAFIgKgnQgDgMgIgIQgKgMgjgaQgegYgTgkQgVgpgCgxQgBgtAQguIAIgTIgTgKQg4glgdgyQgYgsgCgwQAAgXAFgVQALgwAAgPQAAgHgEgKIgRgkIAigWQAKgGAGgLQAHgNAPgpQATg1AxgjQA7gpBUAAIAVACIAEgVQAVhRA5guQAvgnA3gEQArgEAPgEQALgDAJgIIAdgbIAeAaQAJAHAMADQAPADArABQA5ACAwAkQA5ArAaBQIAFAVIAVgDQBVgEA8AmQAzAgAWA0QAQAoAJANQAGAKAKAGIAjATIgPAmQgDAJAAAIQAAAOAOAwQAHAVAAAYQACAvgXAtQgaA0g3AnIgSALIAJATQASAvABArQABAxgTAqQgQAmgeAZQghAcgJAMQgIAJgCALIgIAoIgogDQgMgBgLAFQgOAHgkAYQgvAgg8gBQhHgBhFgyIgQgNIgPAOQhAA1hIAFIgOAAQg0AAgqgag");
	this.shape_1.setTransform(31.6807,31.7081,0.5219,0.5219);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flower2, new cjs.Rectangle(0,0,63.4,63.4), null);


(lib.Group = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path();
	this.instance.setTransform(19.8,41.1,1,1,0,0,0,19.8,41.1);
	this.instance.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,39.5,82.3), null);


(lib.cream = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// ƒŒƒCƒ___1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(0.2,87.8,0.3887,0.3887);

	this.instance_1 = new lib.CachedBmp_38();
	this.instance_1.setTransform(0,0,0.3887,0.3887);

	this.instance_2 = new lib.Group();
	this.instance_2.setTransform(28.85,47.85,0.7443,0.7444,0,0,0,20,41.3);
	this.instance_2.alpha = 0.3984;

	this.instance_3 = new lib.CachedBmp_37();
	this.instance_3.setTransform(0,17.25,0.3887,0.3887);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,188.2,192.2);


// stage content:
(lib.movie = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"flowersfalledited4",startFrame:0,endFrame:163,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("flowersfalledited4",0);
		this.InsertIntoSoundStreamData(soundInstance,0,163,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(163));

	// ccp
	this.instance = new lib.Tween46("synched",0);
	this.instance.setTransform(487.7,278.3);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib.Tween47("synched",0);
	this.instance_1.setTransform(487.7,278.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},142).to({state:[{t:this.instance_1}]},8).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(142).to({_off:false},0).to({_off:true,alpha:1},8).wait(13));

	// cream
	this.instance_2 = new lib.cream("synched",0);
	this.instance_2.setTransform(486.8,330.4,1,1,0,0,0,94,96.2);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(97).to({_off:false},0).to({regX:94.1,regY:96.3,scaleX:1.2862,scaleY:1.2862,x:485.4,y:285.95,alpha:1},5).to({y:385.15},16).wait(21).to({startPosition:0},0).to({alpha:0},4).to({_off:true},1).wait(19));

	// Layer_6
	this.instance_3 = new lib.bottles();
	this.instance_3.setTransform(999.35,273.75,1,1,0,0,0,26.6,55.1);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(70).to({_off:false},0).wait(1).to({regY:55,scaleX:1.0374,scaleY:1.0374,x:956.35,y:233.7},0).wait(1).to({scaleX:1.074,scaleY:1.074,x:918.75,y:206.6},0).wait(1).to({scaleX:1.1099,scaleY:1.1099,x:884,y:188.95},0).wait(1).to({scaleX:1.1451,scaleY:1.1451,x:850.75,y:179.25},0).wait(1).to({scaleX:1.1794,scaleY:1.1794,x:818.05,y:176.75},0).wait(1).to({scaleX:1.2131,scaleY:1.2131,x:785,y:181.55},0).wait(1).to({scaleX:1.2459,scaleY:1.2459,x:750.9,y:194.2},0).wait(1).to({scaleX:1.278,scaleY:1.278,x:714.6,y:215.8},0).wait(1).to({scaleX:1.3094,scaleY:1.3094,x:674.6,y:248.9},0).wait(1).to({scaleX:1.3198,scaleY:1.3198,rotation:-2.0852,x:659.85,y:263.5},0).wait(1).to({rotation:-5.1635,x:659.8},0).wait(1).to({rotation:-8.1638},0).wait(1).to({rotation:-11.086},0).wait(1).to({rotation:-13.9303,x:659.75},0).wait(1).to({rotation:-9.3515,x:659.8},0).wait(1).to({rotation:-0.4016},0).wait(1).to({rotation:8.2982,x:659.85},0).wait(1).to({scaleX:1.3197,scaleY:1.3197,rotation:14.9981},0).wait(1).to({rotation:14.9979},0).wait(1).to({rotation:14.9977},0).wait(1).to({rotation:14.9976},0).wait(1).to({rotation:14.9974},0).wait(1).to({rotation:14.9973},0).wait(1).to({regX:26.7,regY:55.4,scaleX:1.3072,scaleY:1.3072,rotation:14.9977,x:667.3,y:274.15},0).wait(1).to({regX:26.6,regY:55,scaleX:1.0699,scaleY:1.1147,rotation:14.9989,x:642.5,y:265.6},0).wait(1).to({scaleX:0.8464,scaleY:0.9335,x:619.1,y:258.2},0).wait(1).to({scaleX:0.6373,scaleY:0.7639,x:597.25,y:251.25},0).wait(1).to({scaleX:0.4421,scaleY:0.6056,x:576.8,y:244.65},0).wait(1).to({scaleX:0.2612,scaleY:0.4589,x:557.85,y:238.65},0).wait(1).to({scaleX:0.0942,scaleY:0.3235,x:540.4,y:233.1},0).wait(1).to({scaleX:0.0585,scaleY:0.1996,rotation:0,skewX:14.9989,skewY:-165.0011,x:524.45,y:227.95},0).wait(1).to({scaleX:0.1973,scaleY:0.0871,x:509.95,y:223.3},0).to({_off:true},1).wait(60));

	// Layer_5
	this.instance_4 = new lib.bottlel();
	this.instance_4.setTransform(-42.65,266.95,1,1,0,0,0,31.7,60.9);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(70).to({_off:false},0).wait(1).to({regX:31.6,regY:60.8,scaleX:1.0895,scaleY:1.0895,rotation:0.8667,x:-9.3,y:217.4},0).wait(1).to({scaleX:1.179,scaleY:1.179,rotation:1.7335,x:20.95,y:181.85},0).wait(1).to({scaleX:1.2685,scaleY:1.2685,rotation:2.6002,x:49.4,y:157},0).wait(1).to({scaleX:1.358,scaleY:1.358,rotation:3.4669,x:77.2,y:141.6},0).wait(1).to({scaleX:1.4474,scaleY:1.4474,rotation:4.3337,x:105,y:134.95},0).wait(1).to({scaleX:1.5369,scaleY:1.5369,rotation:5.2004,x:133.45,y:137.1},0).wait(1).to({scaleX:1.6264,scaleY:1.6264,rotation:6.0671,x:163.2,y:148.55},0).wait(1).to({scaleX:1.7159,scaleY:1.7159,rotation:6.9338,x:194.95,y:170.2},0).wait(1).to({scaleX:1.8054,scaleY:1.8054,rotation:7.8006,x:229.6,y:204.05},0).wait(1).to({scaleX:1.8949,scaleY:1.8949,rotation:8.6673,x:268.8,y:253.2},0).wait(1).to({scaleX:1.9844,scaleY:1.9844,rotation:9.534,x:314.95,y:323.85},0).wait(1).to({rotation:10.691,x:314.9,y:323.8},0).wait(1).to({rotation:11.848,x:314.95},0).wait(1).to({rotation:13.005},0).wait(1).to({rotation:14.162,y:323.85},0).wait(1).to({rotation:15.319,x:315,y:323.75},0).wait(1).to({rotation:5.3192,x:314.95,y:323.8},0).wait(1).to({rotation:-4.6805,y:323.85},0).wait(1).to({rotation:-14.6803,x:314.9},0).wait(5).to({regX:30.9,regY:59.1,scaleX:1.8407,scaleY:1.8646,rotation:0,skewX:-20.1126,skewY:-19.8743,x:315.05,y:311.05},0).wait(1).to({regX:31.6,regY:60.8,scaleX:1.5917,scaleY:1.6508,skewX:-20.1127,skewY:-19.8754,x:336.7,y:306.2},0).wait(1).to({scaleX:1.3426,scaleY:1.4369,x:356.1,y:298.8},0).wait(1).to({scaleX:1.0935,scaleY:1.2231,x:375.5,y:291.35},0).wait(1).to({scaleX:0.8444,scaleY:1.0092,x:394.9,y:283.9},0).wait(1).to({scaleX:0.5953,scaleY:0.7954,x:414.3,y:276.45},0).wait(1).to({scaleX:0.3463,scaleY:0.5816,x:433.7,y:269.1},0).wait(1).to({scaleX:0.0972,scaleY:0.3677,x:453.1,y:261.65},0).wait(1).to({scaleX:0.1519,scaleY:0.1539,skewY:160.1246,x:472.5,y:254.25},0).to({_off:true},1).wait(60));

	// coil
	this.instance_5 = new lib.coil();
	this.instance_5.setTransform(528.9,331.35,1.198,1.198,0,0,0,52.2,83.7);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(65).to({_off:false},0).to({scaleX:2.5842,scaleY:2.5842,x:530.45,y:331.45,alpha:1},5).to({scaleX:2.5841,scaleY:2.5841,rotation:11.4786,x:530.4,y:331.4},6).to({scaleX:2.5842,scaleY:2.5842,rotation:-18.5204,y:331.45},6).wait(6).to({rotation:0.1668,x:530.3,y:331.4},5).wait(1).to({rotation:0,x:530.45,y:331.45},0).to({regX:52.1,regY:83.8,scaleX:0.0884,scaleY:0.0884,x:509.05,y:331.35},8).to({_off:true},1).wait(60));

	// flower7
	this.instance_6 = new lib.flower7();
	this.instance_6.setTransform(665.1,-253.7,1.8784,1.8784,0,0,0,37.4,37.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:338},18).to({rotation:360},7).to({regX:37.5,regY:37,scaleX:0.7093,scaleY:0.7093,x:558.45,y:121.45},16).to({regX:37.6,regY:37.1,scaleX:1.7307,scaleY:1.7307,rotation:720,x:776,y:161.95},9).wait(7).to({x:772.4,y:161.3},0).to({scaleX:0.7954,scaleY:0.7954,x:478.9,y:272.2,alpha:0.2188},12).to({_off:true},1).wait(93));

	// leaf2
	this.instance_7 = new lib.leaf2();
	this.instance_7.setTransform(657.4,-342,1.8784,1.8784,0,0,0,33.4,97.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({y:249.7},18).wait(7).to({regX:33.5,regY:97.3,scaleX:0.7093,scaleY:0.7093,x:555.5,y:88.2},16).to({regY:97.2,scaleX:2.0606,scaleY:2.0606,rotation:-557.9856,x:967.3,y:309.65},9).wait(7).to({x:971.3,y:323.85},0).to({regX:33.6,scaleX:0.4028,scaleY:0.4028,rotation:-557.9854,x:466.8,y:297.4,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower5
	this.instance_8 = new lib.flower5();
	this.instance_8.setTransform(575.55,-383.5,1.8784,1.8784,0,0,0,37.1,37.1);

	this.instance_9 = new lib.Tween22("synched",0);
	this.instance_9.setTransform(514.75,436.55);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({y:208.2},18).to({rotation:-360},7).to({regX:37,scaleX:0.7093,scaleY:0.7093,x:524.5,y:72.45},16).to({regX:37.1,regY:37.2,scaleX:2.6789,scaleY:2.6789,rotation:-720,x:519.15,y:487.85},9).to({_off:true},7).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(57).to({_off:false},0).to({scaleX:0.3622,scaleY:0.3622,x:450.65,y:279.55,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower4
	this.instance_10 = new lib.flower4();
	this.instance_10.setTransform(545.6,-190.5,1.8784,1.8784,0,0,0,57.8,57.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({y:401.2},18).to({rotation:360},7).to({regY:57.8,scaleX:0.7093,scaleY:0.7093,x:513.25,y:145.45},16).to({regX:58,regY:57.9,scaleX:2.1082,scaleY:2.1082,rotation:0,x:813.5,y:518.85},9).wait(7).to({scaleX:0.4121,scaleY:0.4121,x:457.95,y:366.95,alpha:0.2188},12).to({_off:true},1).wait(93));

	// leaf3
	this.instance_11 = new lib.leaf3();
	this.instance_11.setTransform(641.25,-200.7,1.8784,1.8784,0,0,0,42,62.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({y:391},18).wait(7).to({regY:62.6,scaleX:0.7093,scaleY:0.7093,x:549.35,y:141.6},16).to({regX:25.2,regY:56.5,scaleX:3.1771,scaleY:3.1771,rotation:574.4793,x:664.95,y:393.1},9).wait(7).to({scaleX:0.5096,scaleY:0.5096,rotation:720,skewX:-145.5205,skewY:34.4795,x:472.95,y:393.15,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower6
	this.instance_12 = new lib.flower6();
	this.instance_12.setTransform(584.3,-324.35,1.8784,1.8784,0,0,0,37.1,37.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({y:267.35},18).to({rotation:-360},7).to({regY:37.4,scaleX:0.7093,scaleY:0.7093,x:527.85,y:94.9},16).to({regY:37.2,scaleX:2.5018,scaleY:2.5018,rotation:-720,x:283.3,y:357.9},9).wait(7).to({regX:37.2,scaleX:0.8125,scaleY:0.8125,x:451.75,y:359.15,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower1
	this.instance_13 = new lib.flower1();
	this.instance_13.setTransform(308.65,-365.65,1.8784,1.8784,0,0,0,45,45);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({y:226.05},18).to({rotation:360},7).to({regX:45.1,regY:45.1,scaleX:0.7093,scaleY:0.7093,x:423.85,y:79.3},16).to({regX:45,regY:45,scaleX:3.0274,scaleY:3.0274,rotation:720,x:123.4,y:108.65},9).wait(7).to({scaleX:0.5501,scaleY:0.5501,x:447.4,y:358.05,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower2
	this.instance_14 = new lib.flower2();
	this.instance_14.setTransform(363.25,-189.25,1.8784,1.8784,0,0,0,31.8,31.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({y:402.45},18).to({rotation:-360},7).to({regX:31.9,scaleX:0.7093,scaleY:0.7093,x:444.45,y:145.85},16).to({regY:32,scaleX:4.245,scaleY:4.245,rotation:-720,x:83.5,y:548.25},9).wait(7).to({scaleX:1.1302,scaleY:1.1302,x:468.3,y:414,alpha:0.2188},12).to({_off:true},1).wait(93));

	// leaf2
	this.instance_15 = new lib.leaf2();
	this.instance_15.setTransform(282.2,-284.9,1.8784,1.8784,0,-170.2462,9.7538,33.4,97.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({y:306.8},18).wait(7).to({regX:33.5,scaleX:0.7092,scaleY:0.7092,skewX:-170.2471,skewY:9.7529,x:413.85,y:109.7},16).to({regX:33.6,regY:96.9,scaleX:3.2293,scaleY:3.2293,rotation:-360,skewX:-135.746,skewY:44.254,x:156.85,y:266.95},9).wait(7).to({skewY:44.254},0).to({regY:97,scaleX:0.303,scaleY:0.303,skewX:-135.7446,skewY:44.2554,x:421.2,y:385.4,alpha:0.2188},12).to({_off:true},1).wait(93));

	// flower3
	this.instance_16 = new lib.flower3();
	this.instance_16.setTransform(452.45,-302.35,1.8784,1.8784,0,0,0,61.1,61.1);

	this.ikNode_1 = new lib.flower3();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(497,158.9,1.9807,1.9807,0,0,0,61.1,61);
	this.ikNode_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).to({y:289.35},18).to({rotation:-360},7).to({scaleX:0.7093,scaleY:0.7093,x:478.1,y:103.15},16).to({regY:61,scaleX:1.9807,scaleY:1.9807,rotation:0,x:497,y:158.9},9).to({_off:true},7).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.ikNode_1).wait(57).to({_off:false},0).to({scaleX:0.4562,scaleY:0.4562,x:485.55,y:207.2,alpha:0.2188},12).to({_off:true},1).wait(93));

	// chandstain
	this.instance_17 = new lib.Tween42("synched",0);
	this.instance_17.setTransform(496,965.1);
	this.instance_17._off = true;

	this.instance_18 = new lib.Tween43("synched",0);
	this.instance_18.setTransform(496,370.8);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(107).to({_off:false},0).to({_off:true,y:370.8},11).wait(45));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(107).to({_off:false},11).wait(7).to({startPosition:0},0).to({x:499.1,alpha:0},14).to({_off:true},1).wait(23));

	// hand
	this.instance_19 = new lib.Tween44("synched",0);
	this.instance_19.setTransform(490.2,993);
	this.instance_19._off = true;

	this.instance_20 = new lib.Tween45("synched",0);
	this.instance_20.setTransform(490.2,398.7);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(107).to({_off:false},0).to({_off:true,y:398.7},11).wait(45));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(107).to({_off:false},11).wait(7).to({startPosition:0},0).to({startPosition:0},14).to({alpha:0},4).to({_off:true},1).wait(19));

	// righthand
	this.instance_21 = new lib.righthand();
	this.instance_21.setTransform(481.45,101.3,1,1,0,0,0,143.3,140.6);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(41).to({_off:false},0).wait(1).to({scaleX:0.9752,scaleY:0.9752,x:475,y:97.5},0).wait(1).to({scaleX:0.9504,scaleY:0.9504,x:468.55,y:93.7},0).wait(1).to({scaleX:0.9256,scaleY:0.9255,x:462.15,y:89.9},0).wait(1).to({scaleX:0.9008,scaleY:0.9007,x:455.7,y:86.1},0).wait(1).to({scaleX:0.876,scaleY:0.8759,x:449.25,y:82.3},0).wait(1).to({scaleX:0.8512,scaleY:0.8511,x:442.85,y:78.45},0).wait(1).to({scaleX:0.8264,scaleY:0.8262,x:436.35,y:74.65},0).wait(1).to({scaleX:0.8016,scaleY:0.8014,x:429.9,y:70.85},0).wait(1).to({scaleX:0.7768,scaleY:0.7766,x:423.5,y:67.05},0).wait(1).to({scaleX:0.752,scaleY:0.7518,x:417.05,y:63.25},0).wait(1).to({scaleX:0.7272,scaleY:0.7269,x:410.6,y:59.4},0).wait(1).to({scaleX:0.7024,scaleY:0.7021,x:404.2,y:55.6},0).wait(1).to({scaleX:0.6776,scaleY:0.6773,x:397.75,y:51.8},0).wait(1).to({scaleX:0.6528,scaleY:0.6525,x:391.3,y:48},0).wait(1).to({scaleX:0.628,scaleY:0.6277,x:384.9,y:44.2},0).wait(2).to({scaleX:0.7699,scaleY:0.7694,x:252.1,y:66.55},0).wait(1).to({scaleX:0.9118,scaleY:0.9112,x:146.4,y:87.85},0).wait(1).to({scaleX:1.0537,scaleY:1.053,x:67.45,y:108.2},0).wait(1).to({scaleX:1.1955,scaleY:1.1948,x:14.4,y:127.85},0).wait(1).to({scaleX:1.3374,scaleY:1.3366,x:-13,y:146.9},0).wait(1).to({scaleX:1.4793,scaleY:1.4784,x:-15.3,y:165.5},0).wait(1).to({scaleX:1.6212,scaleY:1.6202,x:6.95,y:183.9},0).wait(1).to({scaleX:1.7631,scaleY:1.762,x:53.35,y:202.25},0).wait(1).to({scaleX:1.9049,scaleY:1.9038,x:123.4,y:220.6},0).wait(1).to({scaleX:2.0468,scaleY:2.0456,x:216.55,y:239.25},0).wait(1).to({scaleX:2.1887,scaleY:2.1874,x:332.4,y:258.35},0).wait(1).to({scaleX:2.3306,scaleY:2.3292,x:470.6,y:278.05},0).wait(1).to({x:472.5},0).wait(1).to({x:474.3},0).wait(1).to({x:475.95},0).wait(1).to({x:477.55},0).wait(1).to({x:479},0).wait(1).to({x:480.35},0).wait(1).to({x:481.6},0).wait(1).to({x:482.7},0).wait(1).to({x:483.6},0).wait(1).to({x:484.3},0).wait(1).to({x:484.8},0).wait(1).to({x:485},0).wait(22).to({y:294.05},0).wait(1).to({y:310.05},0).wait(1).to({y:326.05},0).wait(1).to({y:275.85,alpha:0.9769},0).wait(1).to({y:225.6,alpha:0.9538},0).wait(1).to({y:175.4,alpha:0.9308},0).wait(1).to({y:125.2,alpha:0.9077},0).wait(1).to({y:74.95,alpha:0.8846},0).wait(1).to({y:24.75,alpha:0.8615},0).wait(1).to({y:-25.45,alpha:0.8385},0).wait(1).to({y:-75.7,alpha:0.8154},0).wait(1).to({y:-125.9,alpha:0.7923},0).wait(1).to({y:-176.1,alpha:0.7692},0).wait(1).to({y:-226.35,alpha:0.7462},0).wait(1).to({y:-276.55,alpha:0.7231},0).wait(1).to({y:-326.75,alpha:0.7},0).to({_off:true},1).wait(44));

	// lefthand
	this.instance_22 = new lib.lefthand();
	this.instance_22.setTransform(474,106.35,1,1,0,0,0,143.3,140.6);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(41).to({_off:false},0).wait(1).to({scaleX:0.9752,scaleY:0.9752,x:481.25,y:102.25},0).wait(1).to({scaleX:0.9504,scaleY:0.9504,x:488.5,y:98.1},0).wait(1).to({scaleX:0.9256,scaleY:0.9256,x:495.75,y:94},0).wait(1).to({scaleX:0.9009,scaleY:0.9008,x:503,y:89.85},0).wait(1).to({scaleX:0.8761,scaleY:0.876,x:510.25,y:85.7},0).wait(1).to({scaleX:0.8513,scaleY:0.8512,x:517.5,y:81.55},0).wait(1).to({scaleX:0.8265,scaleY:0.8264,x:524.8,y:77.45},0).wait(1).to({scaleX:0.8017,scaleY:0.8015,x:532.05,y:73.3},0).wait(1).to({scaleX:0.7769,scaleY:0.7767,x:539.3,y:69.15},0).wait(1).to({scaleX:0.7522,scaleY:0.7519,x:546.55,y:65},0).wait(1).to({scaleX:0.7274,scaleY:0.7271,x:553.8,y:60.9},0).wait(1).to({scaleX:0.7026,scaleY:0.7023,x:561.05,y:56.75},0).wait(1).to({scaleX:0.6778,scaleY:0.6775,x:568.35,y:52.6},0).wait(1).to({scaleX:0.653,scaleY:0.6527,x:575.6,y:48.45},0).wait(1).to({scaleX:0.6282,scaleY:0.6279,x:582.85,y:44.35},0).wait(2).to({scaleX:0.7701,scaleY:0.7697,x:686.25,y:49.35},0).wait(1).to({scaleX:0.912,scaleY:0.9115,x:789.8,y:53},0).wait(1).to({scaleX:1.0539,scaleY:1.0532,x:893.3,y:55.8},0).wait(1).to({scaleX:1.1958,scaleY:1.195,x:995.85,y:68.5},0).wait(1).to({scaleX:1.3377,scaleY:1.3368,x:1090.35,y:109},0).wait(1).to({scaleX:1.4796,scaleY:1.4786,x:1123.6,y:174.45},0).wait(1).to({scaleX:1.6215,scaleY:1.6204,x:1024.75,y:202.6},0).wait(1).to({scaleX:1.7634,scaleY:1.7622,x:922.4,y:214.7},0).wait(1).to({scaleX:1.9053,scaleY:1.9039,x:822.25,y:239.95},0).wait(1).to({scaleX:2.0471,scaleY:2.0457,x:722.15,y:265.4},0).wait(1).to({scaleX:2.189,scaleY:2.1875,x:619.75,y:276.6},0).wait(1).to({scaleX:2.3309,scaleY:2.3293,x:516.45,y:279.9},0).wait(1).to({x:514.1,y:279.35},0).wait(1).to({x:511.7,y:279},0).wait(1).to({x:509.3,y:278.7},0).wait(1).to({x:506.9,y:278.55},0).wait(1).to({x:504.5,y:278.45},0).wait(1).to({x:502.1,y:278.4},0).wait(1).to({x:499.65,y:278.45},0).wait(1).to({x:497.35,y:278.6},0).wait(1).to({x:494.85,y:278.8},0).wait(1).to({x:492.45,y:279.1},0).wait(1).to({x:490.35,y:279.4},0).wait(1).to({x:487.65,y:279.9},0).wait(1).to({x:488.35,y:279.75},0).wait(1).to({x:489.1,y:279.6},0).wait(1).to({x:489.8,y:279.45},0).wait(1).to({x:490.55,y:279.3},0).wait(1).to({x:491.25,y:279.2},0).wait(1).to({x:491.95,y:279.05},0).wait(1).to({x:492.7,y:278.9},0).wait(1).to({x:493.4,y:278.75},0).wait(1).to({x:494.1,y:278.6},0).wait(1).to({x:494.85,y:278.5},0).wait(1).to({y:278.45},0).wait(1).to({x:494.15,y:278.6},0).wait(1).to({x:493.5,y:278.75},0).wait(1).to({x:492.7,y:278.9},0).wait(1).to({x:492.45,y:278.95},0).wait(1).to({x:492.1,y:279},0).wait(1).to({x:491.7,y:279.1},0).wait(1).to({x:491.25,y:279.15},0).wait(1).to({x:490.7,y:279.3},0).wait(1).to({x:489.9,y:279.45},0).wait(1).to({x:487.65,y:279.9},0).wait(1).to({x:492.75,y:296.55},0).wait(1).to({x:495.2,y:313.75},0).wait(1).to({x:487.65,y:327.85},0).wait(1).to({x:488.85,y:277.25,alpha:0.9769},0).wait(1).to({x:490,y:226.6,alpha:0.9538},0).wait(1).to({x:491.05,y:175.95,alpha:0.9308},0).wait(1).to({x:492,y:125.3,alpha:0.9077},0).wait(1).to({x:492.9,y:74.65,alpha:0.8846},0).wait(1).to({x:493.65,y:23.95,alpha:0.8615},0).wait(1).to({x:494.35,y:-26.7,alpha:0.8385},0).wait(1).to({x:494.85,y:-77.35,alpha:0.8154},0).wait(1).to({x:495.15,y:-128.05,alpha:0.7923},0).wait(1).to({x:495.2,y:-178.7,alpha:0.7692},0).wait(1).to({x:494.8,y:-229.35,alpha:0.7462},0).wait(1).to({x:493.65,y:-280,alpha:0.7231},0).wait(1).to({x:487.65,y:-329.7,alpha:0.7},0).to({_off:true},1).wait(44));

	// hand
	this.instance_23 = new lib.hand();
	this.instance_23.setTransform(477.6,-344.7,1.8784,1.8784,0,0,0,177.8,174.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).to({y:247},18).wait(7).to({x:477.65},0).to({scaleX:0.764,scaleY:0.764,x:478.05,y:98.25},16).to({_off:true},1).wait(121));

	// background
	this.instance_24 = new lib.Tween17("synched",0);
	this.instance_24.setTransform(480.95,323.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(25).to({startPosition:0},0).to({regX:0.1,scaleX:0.5971,scaleY:0.5971,x:481},24).to({regX:0,scaleX:0.4796,scaleY:0.4796,x:480.95},7).to({regX:0.1,regY:0.1,scaleX:0.9828,scaleY:0.9829,x:491.2,y:319.5},12).wait(72).to({startPosition:0},0).to({alpha:0},6).to({_off:true},1).wait(16));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-39,-357.7,1520,1705.9);
// library properties:
lib.properties = {
	id: 'E61A021BE956A5458BAD8170D8A9B037',
	width: 960,
	height: 640,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/movie_atlas_1.png", id:"movie_atlas_1"},
		{src:"images/movie_atlas_2.png", id:"movie_atlas_2"},
		{src:"images/movie_atlas_3.png", id:"movie_atlas_3"},
		{src:"sounds/flowersfalledited4.mp3", id:"flowersfalledited4"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E61A021BE956A5458BAD8170D8A9B037'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;