
In order to produce repeatable container builds, bazel strips the date of the images it produces.
So the same image, produced from the same source at two different times will be identified as the same image.

If the date were different, k8s would think it was a different image and do a re-deploy.

Source: https://www.youtube.com/watch?v=DTvXa-iqrfA&ab_channel=CNCF%5BCloudNativeComputingFoundation%5D
19:20