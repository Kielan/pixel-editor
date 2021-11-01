const ToolManager = (() => {
    brushTool = new BrushTool("brush", {type: 'html'}, switchTool);
    eraserTool = new EraserTool("eraser", {type: 'html'}, switchTool);
    rectangleTool = new RectangleTool("rectangle", {type: 'html'}, switchTool);
    lineTool = new LineTool("line", {type: 'html'}, switchTool);
    fillTool = new FillTool("fill", {type: 'cursor', style: 'crosshair'}, switchTool);
    
    eyedropperTool = new EyedropperTool("eyedropper", {type: 'cursor', style: 'crosshair'}, switchTool);
    panTool = new PanTool("pan", {type: 'custom'}, switchTool);
    zoomTool = new ZoomTool("zoom", {type:'custom'});

    rectSelectTool = new RectangularSelectionTool("rectselect", 
        {type: 'cursor', style:'crosshair'}, switchTool);
    moveSelectionTool = new MoveSelectionTool("moveselection", 
        {type:'cursor', style:'crosshair'}, switchTool);

    currTool = brushTool;
    currTool.onSelect();
    canvasView.style.cursor = 'default';

    Events.on("mouseup", window, onMouseUp);
    Events.on("mousemove", window, onMouseMove);
    Events.on("mousedown", window, onMouseDown);
    Events.on("mousewheel", window, onMouseWheel);

    function onMouseWheel(mouseEvent) {
        let mousePos = Input.getCursorPosition(mouseEvent);
        zoomTool.onMouseWheel(mousePos, mouseEvent.deltaY < 0 ? 'in' : 'out');
    }

    function onMouseDown(mouseEvent) {
        if (!Startup.documentCreated())
            return;

        let mousePos = Input.getCursorPosition(mouseEvent);

        switch(mouseEvent.which) {
            case 1:
                if (!Input.isDragging()) {
                    currTool.onStart(mousePos, mouseEvent.target);
                }
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }

    function onMouseMove(mouseEvent) {
        if (!Startup.documentCreated())
            return;
        let mousePos = Input.getCursorPosition(mouseEvent);
        // Call the hover event
        currTool.onHover(mousePos, mouseEvent.target);

        if (Input.isDragging()) {
            currTool.onDrag(mousePos, mouseEvent.target);
        }
    }

    function onMouseUp(mouseEvent) {
        if (!Startup.documentCreated())
            return;
        let mousePos = Input.getCursorPosition(mouseEvent);

        switch(mouseEvent.which) {
            case 1:
                if (Input.isDragging()) {
                    currTool.onEnd(mousePos);
                }
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }

    function currentTool() {
        return currTool;
    }

    function switchTool(newTool) {
        currTool.onDeselect();
        currTool = newTool;
        currTool.onSelect();
    }

    return {
        currentTool
    }
})();