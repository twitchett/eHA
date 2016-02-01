# Application submission

### Depth-first Tree Traversal

A recursive depth-first search can be used to traverse a tree, as shown by the following pseudocode:

```
node = rootnode

dfs(node) {
	visit(node) 	
	for each child in node.getChildren() {
		dfs(child)
	}
}
```

Its time complexity is O(N), as each node is visited once. It yields results from the top down (a pre-order search).

The recursive DFS is useful when a large tree must be traversed, as only the current node and its parents need to be stored in memory, rather than the whole tree. This means the memory requirements are limited to the storing the number of nodes of the maximum height of the tree. This is in contrast to a stack-based depth-first search, or breadth-first search, both of which require the entire tree to be stored.

### JavaScript functions

Function implementations are in eHAFunctions.js. Demos can be seen in eHAFunctions_examples.html.

### Angular app

Everything under \angular. Contains a simple service, controller, and tests (Karma & Jasmine).

To install:

```
npm install
```

To run tests:

```
npm test
````

Note: this didn't quite work as expected, as the $q promises did not resolve when running using Karma. I used [this](https://github.com/wspringer/angular-pouchdb) angular-pouchdb (as provided in the instructions), as opposed to [this](https://github.com/angular-pouchdb/angular-pouchdb) newer one. 
