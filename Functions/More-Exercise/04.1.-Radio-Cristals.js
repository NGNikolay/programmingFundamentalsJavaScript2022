function radioCrystals(input) {
    workArray = [];
    for (let i = 1; i < input.length; i++) {
        workArray.push(input[i]);
    }
    let cutCount = 0;
    let lapCount = 0;
    let grindCount = 0;
    let etchCount = 0;
    let xRayCount = 0;

    let desiredThickness = input[0];
    let currentCrystal;


    // let cut = number => number / 4;
    let lap = number => number * 0.8;
    let grind = number => number - 20;
    let etch = number => number - 2;
    let xRay = number => number + 1;
    let transportAndWashing = number => Math.floor(number);

    for (let j = 0; j < workArray.length; j++) {
        currentCrystal = workArray[j];
        cutCount = 0;
        lapCount = 0;
        grindCount = 0;
        etchCount = 0;
        xRayCount = 0;
        let cutFlag = false;
        let lapFlag = false;
        let grindFlag = false;
        let etchFlag = false;
        while (currentCrystal !== desiredThickness) {
            if (currentCrystal / desiredThickness >= 4) {
                currentCrystal = cut1(currentCrystal, desiredThickness);
                continue;
            } else {
                if (cutCount > 0 && !cutFlag) {
                    currentCrystal = transportAndWashing(currentCrystal);
                    cutFlag = true;
                }
                if (lap(currentCrystal) < grind(currentCrystal) && (lap(currentCrystal) > desiredThickness)) {
                    currentCrystal = lap(currentCrystal);
                    // currentCrystal = transportAndWashing(currentCrystal);
                    lapCount++;
                    continue;
                } else {
                    if (lapCount > 0 && !lapFlag) {
                        currentCrystal = transportAndWashing(currentCrystal);
                        lapFlag = true;
                    }
                    if (grind(currentCrystal) > desiredThickness) {
                        currentCrystal = grind(currentCrystal);
                        // currentCrystal = transportAndWashing(currentCrystal);
                        grindCount++;
                        continue;
                    } else {
                        if (grindCount > 0 && !grindFlag) {
                            currentCrystal = transportAndWashing(currentCrystal);
                            grindFlag = true;
                        }
                        if (etch(currentCrystal) >= desiredThickness || (etch(currentCrystal) - desiredThickness) == -1) {
                            currentCrystal = etch(currentCrystal);
                            // currentCrystal = transportAndWashing(currentCrystal);
                            etchCount++;
                            continue;
                        } else {
                            if (etchCount > 0 && !etchFlag) {
                                currentCrystal = transportAndWashing(currentCrystal);
                                etchFlag = true;
                            }
                            if (currentCrystal < desiredThickness && xRayCount == 0) {
                                currentCrystal = xRay(currentCrystal);
                                xRayCount++;
                                break;
                            }
                        }
                    }
                }
            }
        }

        if (currentCrystal === desiredThickness) {
            console.log(`Processing chunk ${workArray[j]} microns`);
            if (cutCount > 0) {
                console.log(`Cut x${cutCount}`);
                console.log(`Transporting and washing`);
            }

            if (lapCount > 0) {
                console.log(`Lap x${lapCount}`);
                console.log(`Transporting and washing`);
            }

            if (grindCount > 0) {
                console.log(`Grind x${grindCount}`);
                console.log(`Transporting and washing`);
            }

            if (etchCount > 0) {
                console.log(`Etch x${etchCount}`);
                console.log(`Transporting and washing`);
            }

            if (xRayCount > 0) {
                console.log(`X-ray x${xRayCount}`);
            }

            console.log(`Finished crystal ${currentCrystal} microns`);
        }
    }

    function cut1(current, desired) {
        if (current / desired >= 4) {
            currentCrystal = currentCrystal / 4;
            // currentCrystal = transportAndWashing(currentCrystal);
            cutCount++;
            if (currentCrystal / desiredThickness >= 4) {
                cut1(currentCrystal, desiredThickness);
            }
            return currentCrystal;
        } else {
            return currentCrystal;
        }
    }
}
radioCrystals([1375, 50000]);