class ExtendedClock extends Clock {
    constructor({template}) {
        super({template});
        this.precision = 1000;
    }
}
