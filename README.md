# react-native-barcode-reader

A simple Barcode Reader Screen implemented with [react-native-camera](https://github.com/lwansbrough/react-native-camera).

# barcode-reader

![barcode-reader](https://github.com/sahir/react-native-barcode-reader/blob/master/screenshots/barcode-reader.jpeg)

## Usage

```js
render() {
		const styles = this.defaultStyles();
		return (
			<View style={styles.container}>
				<Camera
					ref={cam => {
						this.camera = cam;
					}}
					style={styles.preview}
					aspect={this.state.camera.aspect}
					captureTarget={this.state.camera.captureTarget}
					type={this.state.camera.type}
					flashMode={this.state.camera.flashMode}
					onFocusChanged={() => {}}
					onZoomChanged={() => {}}
					defaultTouchToFocus
					mirrorImage={false}
					barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
					barcodeFinderWidth={280}
					barcodeFinderHeight={220}
					barcodeFinderBorderColor="red"
					barcodeFinderBorderWidth={2}
					onBarCodeRead={this.onBarCodeRead.bind(this)}
				/>
				<View style={[styles.overlay, styles.topOverlay]}>
					<Text style={styles.scanScreenMessage}>
						Please scan the barcode at the bottom of your receipt.
					</Text>
				</View>
				<View style={[styles.overlay, styles.bottomOverlay]}>
					<Button style={styles.enterBarcodeManualButton}
            title='Enter Barcode Manually'>
					</Button>
				</View>
			</View>
		);
	}
```
