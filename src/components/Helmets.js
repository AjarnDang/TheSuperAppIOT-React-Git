import React from 'react'
import { Helmet } from 'react-helmet';

function Helmets() {
    return (
        <Helmet>
            {/* Bootstrap core JavaScript */}
            <script src="../vendor/jquery/jquery.min.js"></script>
            <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

            {/* Core plugin JavaScript */}
            <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>

            {/* Page level plugins */}
            <script src="../assets/js/sb-admin-2.min.js"></script>

            {/* Page level custom scripts */}
            <script src="../assets/js/demo/chart-area-demo.js"></script>
            <script src="../assets/js/demo/chart-pie-demo.js"></script>
        </Helmet>
    )
}

export default Helmets