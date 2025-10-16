import UIKit
import Capacitor

class ShakeDetectingViewController: CAPBridgeViewController {

    override var canBecomeFirstResponder: Bool {
        return true
    }

    override func viewDidAppear(_ animated: Bool) {
        // called when the view controller appears on the screen
        super.viewDidAppear(animated)
        print("ShakeDetectingViewController: viewDidAppear - becoming first responder")
        self.becomeFirstResponder()
        print("ShakeDetectingViewController: Is first responder? \(self.isFirstResponder)")
    }

    override func viewWillDisappear(_ animated: Bool) {
        // called when the view controller disappears from the screen
        super.viewWillDisappear(animated)
        self.resignFirstResponder()
    }

    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        // Override motionEnded (not motionBegan) to suppress iOS's "Shake to Undo" dialog
        // By NOT calling super.motionEnded(), we prevent the default undo dialog

        print("ShakeDetectingViewController: motionEnded called, motion type: \(motion.rawValue)")

        // post the notification to the shake detection plugin
        if motion == .motionShake {
            print("ShakeDetectingViewController: SHAKE DETECTED! Posting notification...")
            NotificationCenter.default.post(name: NSNotification.Name("DeviceShakeDetected"), object: nil)
            print("ShakeDetectingViewController: Notification posted")
        }
    }
}
