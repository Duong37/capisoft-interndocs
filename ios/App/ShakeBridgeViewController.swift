import UIKit
import Capacitor

/**
 * Custom Capacitor bridge view controller that adds shake detection
 * Subclasses CAPBridgeViewController to override motion handling
 */
class ShakeBridgeViewController: CAPBridgeViewController {

    // Allow this view controller to become first responder to receive motion events
    override var canBecomeFirstResponder: Bool {
        return true
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        // Claim first responder status to receive shake events
        self.becomeFirstResponder()
        print("ShakeBridgeViewController: Became first responder")
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        // Release first responder when view disappears
        self.resignFirstResponder()
    }

    // Called when a motion gesture (like shaking) ends
    // Don't call super.motionEnded() to suppress iOS's default "Shake to Undo" dialog
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        print("ShakeBridgeViewController: motionEnded called, motion type: \(motion.rawValue)")

        if motion == .motionShake {
            print("ShakeBridgeViewController: SHAKE DETECTED! Posting notification...")

            // Post notification that our Shake Capacitor plugin is listening for
            NotificationCenter.default.post(
                name: NSNotification.Name("DeviceShakeDetected"),
                object: nil
            )
        }
    }
}
