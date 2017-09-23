//
// Copyright © 2017-Present, Punchh, Inc.
// All rights reserved.
//

export default class Utility {
	static isValidBarcode(barcode) {
		const regex = '[0-9]';
		if (barcode.match(regex)) {
			return true;
		}
		return false;
	}
}
