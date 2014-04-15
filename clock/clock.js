// ----------------------------------------------------------------------------
// ClockView
// ----------------------------------------------------------------------------

var ClockView = voodoo.View.extend({
	/**
	 * Create and adds meshes to the scene and triggers.
	 */
	load: function() {
		var baseMaterial = new THREE.MeshLambertMaterial({ambient: 0x000000});
		baseMaterial.color.copy(this.model.color);
		var baseGeometry = new THREE.CylinderGeometry(1, 1, 1, 100);
		this.baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
		
		this.scene.add(this.baseMesh);
		this.triggers.add(this.baseMesh);
		
		var depth = 50;
		this.baseMesh.position.z = depth / 2.0;
		this.baseMesh.scale.y = depth;
		this.baseMesh.rotation.x = Math.PI / 2.0;
		
		// Load hands
		this.hands = [];
		this.hands.push(this.loadHand(0.03, 0.5, depth + 15, 0x303030)); // Hour hand
		this.hands.push(this.loadHand(0.02, 0.7, depth + 10, 0x606060)); // Minute hand
		this.hands.push(this.loadHand(0.01, 0.9, depth + 5, 0xFF0000)); // Second hand
	},

	/**
	 * Removes meshes from the scene and triggers.
	 */
	unload: function() {
		for (var i = 0; i < this.hands.length; ++i)
			this.scene.remove(this.hands[i]);
			
		this.scene.remove(this.baseMesh);
		this.triggers.remove(this.baseMesh);
	},
	
	/**
	 * Creates a hand mesh and adds it to the scene. Returns the mesh.
	 */
	loadHand: function(width, height, depth, color) {
		var handMaterial = new THREE.MeshLambertMaterial({color: color, ambient: 0x000000});
		var handGeometry = this.createHandGeometry(width, height);
		var handMesh = new THREE.Mesh(handGeometry, handMaterial);
		
		this.scene.add(handMesh);
		
		handMesh.position.z = depth;
		
		return handMesh;
	},
	
	/**
	 * Creates the geometry for a rectangular clock hand pointing at 12 o'clock.
	 * Width and height are in unit space (from -1 to 1).
	 */
	createHandGeometry: function(width, height) {
		var geometry = new THREE.Geometry();
		
		geometry.vertices.push(new THREE.Vector3(-width, 0.3 * height, 0.0));
		geometry.vertices.push(new THREE.Vector3(-width, -1.0 * height, 0.0));
		geometry.vertices.push(new THREE.Vector3( width, -1.0 * height, 0.0));
		geometry.vertices.push(new THREE.Vector3( width, 0.3 * height, 0.0));
		
		geometry.faces.push(new THREE.Face3(0, 1, 2));
		geometry.faces.push(new THREE.Face3(0, 2, 3));
		
		geometry.computeFaceNormals();
		
		return geometry;
	},
	
	/**
	 * Positions and resizes the base and hands to fit inside a rectangle.
	 * This is called from the model on update to move the clock inside a div.
	 */
	move: function(x, y, width, height) {
		this.baseMesh.position.x = x + width / 2.0;
		this.baseMesh.position.y = y + height / 2.0;
		this.baseMesh.scale.x = width / 2.0;
		this.baseMesh.scale.z = height / 2.0;
		
		for (var i = 0; i < this.hands.length; ++i) {
			this.hands[i].position.x = x + width / 2.0;
			this.hands[i].position.y = y + height / 2.0;
			this.hands[i].scale.x = width / 2.0;
			this.hands[i].scale.y = height / 2.0;
		}
	},
	
	/**
	 * Rotates the clock hands.
	 * This is called from the model on update to set the time.
	 */
	tick: function(hourAngle, minuteAngle, secondAngle) {
		this.hands[0].rotation.z = hourAngle;
		this.hands[1].rotation.z = minuteAngle;
		this.hands[2].rotation.z = secondAngle;
	}
});

// ----------------------------------------------------------------------------
// Clock
// ----------------------------------------------------------------------------

var Clock = voodoo.Model.extend({
	name: 'Clock',
	viewType: ClockView,

	/**
	 * First method called when the model is created.
	 */
	initialize: function(options) {
		// Store options provided by the user.
		this.color = voodoo.utility.convertCssColorToThreeJsColor(options.color);
		this.element = options.element;
	},

	/**
	 * Called each frame.
	 */
	update: function(deltaTime) {
		// Move the clock over the div.
		var position = voodoo.utility.findAbsolutePosition(this.element);
		this.view.move(position.x, position.y, this.element.offsetWidth, this.element.offsetHeight);
		
		// Set the time.
		var date = new Date();
		this.view.tick(date.getHours() / 12.0 * Math.PI * 2.0,
			date.getMinutes() / 60.0 * Math.PI * 2.0,
			date.getSeconds() / 60.0 * Math.PI * 2.0);
	}
});

// ----------------------------------------------------------------------------
// BlueClock
// ----------------------------------------------------------------------------

var BlueClock = Clock.extend({
	initialize: function(options) {
		options.color = 'blue';
		Clock.prototype.initialize.call(this, options);
	}
});