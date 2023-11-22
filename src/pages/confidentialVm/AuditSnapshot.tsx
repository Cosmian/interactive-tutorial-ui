import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CodeBackground, VmCode } from "../../component/Code";
import Split from "../../component/Split";
import { useBoundStore, useConfidentialVmSore } from "../../store/store";
import { findCurrentNavigationItem, updateNavigationSteps } from "../../utils/navigationActions";

const AuditSnapshot = (): JSX.Element => {
  const { snapshot } = useConfidentialVmSore((state) => state);
  const { steps, setSteps } = useBoundStore((state) => state);
  const currentItem = findCurrentNavigationItem(steps);
  const navigate = useNavigate();

  useEffect(() => {
    if (snapshot) {
      updateNavigationSteps(steps, setSteps);
      navigate("#");
    }
  }, []);

  return (
    <Split>
      <Split.Content>
        <h1>{currentItem?.label}</h1>
        <p>Inside the snapshot, the administrator retrieves its application and its exact digest.</p>
      </Split.Content>

      <Split.Code>
        <CodeBackground>{snapshot && <VmCode code={AUDIT} machine="admin" />}</CodeBackground>
      </Split.Code>
    </Split>
  );
};

export default AuditSnapshot;

/* eslint-disable no-useless-escape */
const AUDIT = `.. escamotage
68f72ed2\f/usr/share/man/man1/gloud beta firebase test ios models describe. 1.gz\nb17b047b449e39ddaf3a119036749a134f253f881a34616cf5700315a96dc7c\f /us/local/go/test/fixedbugs/bug409 .go \n56c9a32398d102b44ec1cb079b23c7cdb9158644988415cac6еа6406d57912ea\f/usr/share/man/manl/gcloud compute interco hnects_locations.1.gz\n49ac83187e6068b56ddd36bf5bf291c15838776aaf1455076€ abc500d25459c\f/us/share/locale/bg/LC_MESSAGES/system.mo\n66e59331111b451fc4a5edd465818ae6cc7a82bb8e0600becd662cd0a5f15d64\f/usr/share/man/manl/op enssl-×509.1ossl.gz\n7891fddbb1419cd96c4cb787347fe3a45d805529ba3c446c016 cb3c2f74e8d\f/home,./helloworld\n7ba565ab3d4132d6cb3ee77d4f3a82£7475529440155f5 fb0f96138dd77e7d\f/us/share/terminfo/x xterm-new\ndb6cfc780a35c1a6b6f7099f3593f91ff19e68a9219adf5e50251eb8c5c50 79\f/us/local/go/test/typeparam/issue49667.dir/a.go\n223920340ec1dd43eae
237a5771dbd22e9c006e3facb356f57a0f19afad525\f/usr/local/go/test/escape2.go\ n6ab0f522345bea44a5c81a45b571887538c6035d65ce78586791579846c72\f/usr/ share/man/man1/gcloud workflows. 1.gz\n6954863afe91664a6f36d4236f25c277c01c 2651697ec2e5f7620eefe89f6bf\f/usr/lib64/google-cloud-sdk/lib/thirdparty/ botocore/data/sms/2016-10-24/service-2.json\nd7887dfd944f1ff80a9c23d6ac2a134c78cbcc6d42c60d7452b2b26a815c9280\f/usr/local/go/src/internal/poll/file plan9. 6957449a0d0d120463a2aadf33161a92991814362a77f5ccc7a38a4d71a8f9eAf/usr/lib64/google-cloud-sdk/platform/gsutil/third_party/crcmod/python3/c remod/predefined.py\nbdc7418634847ff637a054a996bb4a2012670de2b1079301291124848c91b52\f/us/share/man/manl/gcloud beta identity groups memberships delete. 
1.g\nb9a6587547a2185215439d94b284aa8cfc39fea330f9a8900be30d24 f140 23\f/usr/lib64/google-cloud-sdk/lib/surface/compute/instances/update conta iner.py\n523dd267167700d11d4d99cacc90270c8302c915c56e16393685274f0a24bb0\ f/root/.cache/go-build/23/23851ac3ac5f8643b4b887978873a3a1c2734d13f7d9efb
24a6d21f76694904-a\nc9d4ef9a8cf4bc9elad1a8367c76c86961791c015567e67934b54d fe387c6d1\f/us/lib64/google-cloud-sdk/platform/gsutil/gslib/vendored/bot b/tests/integration/gs/testcase.py\ne425a1d97334b4bcee7d3ac4cc902e45hed9ee cd9818f7e61237abb94434d611\f/usr/lib64/aooale-cloud-sdk/lib/suAdminsysmachine
`;
