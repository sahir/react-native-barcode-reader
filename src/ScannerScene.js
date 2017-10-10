import React, { Component } from 'react';
import { View, AppRegistry, Text, Button } from 'react-native';
import Camera from 'react-native-camera';

export default class ScannerScene extends Component {
	constructor(props) {
		super(props);
		this.camera = null;
		this.barcodeCodes = [];

		this.state = {
			camera: {
				aspect: Camera.constants.Aspect.fill,
				captureTarget: Camera.constants.CaptureTarget.cameraRoll,
				type: Camera.constants.Type.back,
				orientation: Camera.constants.Orientation.auto,
				flashMode: Camera.constants.FlashMode.auto,
				barcodeFinderVisible: true
			}
		};
	}

	onBarCodeRead(scanResult) {
		console.warn(scanResult.type);
		console.warn(scanResult.data);
		if (scanResult.data != null) {
			if (!this.barcodeCodes.includes(scanResult.data)) {
				this.barcodeCodes.push(scanResult.data);
				console.warn('onBarCodeRead call');
			}
		}
		//return;
	}

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
					<Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
				</View>
				<View style={[styles.overlay, styles.bottomOverlay]}>
					<Button style={styles.enterBarcodeManualButton} title="Enter Barcode" />
				</View>
			</View>
		);
	}
	defaultStyles() {
		return {
			container: {
				flex: 1
			},
			preview: {
				flex: 1,
				justifyContent: 'flex-end',
				alignItems: 'center'
			},
			overlay: {
				position: 'absolute',
				padding: 16,
				right: 0,
				left: 0,
				alignItems: 'center'
			},
			topOverlay: {
				top: 0,
				flex: 1,
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center'
			},
			bottomOverlay: {
				bottom: 0,
				backgroundColor: 'rgba(0,0,0,0.4)',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center'
			},
			enterBarcodeManualButton: {
				padding: 15,
				backgroundColor: 'white',
				borderRadius: 40
			},
			scanScreenMessage: {
				fontSize: 14,
				color: 'white',
				textAlign: 'center',
				alignItems: 'center',
				justifyContent: 'center'
			}
		};
	}
}

AppRegistry.registerComponent('react-native-barcode-reader', () => ScannerScene);
