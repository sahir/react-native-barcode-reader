import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View, AppRegistry, Text, Button } from 'react-native';
import Camera from 'react-native-camera';
import Utility from './Utility';


export default class ScannerScene extends React.Component {
  constructor(props) {
		super(props);
		this.camera = null;
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
		console.warn('onBarCodeRead');
		const code = scanResult.data;
		if (Utility.isValidBarcode(code)) {
			this.componentWillUnmount();
			setTimeout(() => {
				this.componentWillMount();
			}, 3000);
			console.warn('valid');
		} else {
			Alert.alert('error', 'invalid Barcode', [
				{
					text: 'rescanButtonLabel',
				}
			]);
		}
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
				alignItems: 'center'
			}
		};
	}
}

AppRegistry.registerComponent('ScannerScene', () => ScannerScene)
