# fork-join-springboot-angular

In parallel computing, fork–join is a way of setting up and executing parallel programs, such that execution branches off in parallel at designated points in the program, to "join" (merge) at a subsequent point and resume sequential execution. Parallel sections may fork recursively until a certain task granularity is reached. Fork–join can be considered a parallel design pattern.

# fork-join flow


![fork join](images/forkjoin.png)

<table>
 <tr>
    <th style="text-align:left">Name</th>
    <th style="text-align:left">Port</th> 
    <th style="text-align:left">Description</th>
  </tr>
  <tr>
    <td><a href="https://github.com/BarathArivazhagan/fork-join-springboot-angular/tree/master/bank-service"> bank-service</a></td>
    <td>9001</td>
    <td>Spring Boot Microservice</td>
  </tr>
  <tr>
    <td><a href="https://github.com/BarathArivazhagan/fork-join-springboot-angular/tree/master/user-service">user-service</a></td>
    <td>9000</td>
    <td>Spring Boot Microservice</td>
  </tr>
  <tr>
    <td><a href="https://github.com/BarathArivazhagan/fork-join-springboot-angular/tree/master/fork-join-demo">fork-join-demo</a></td>
    <td>4200</td>
    <td>Angular App</td>
  </tr>
  <tr>
    <td><a href="https://github.com/BarathArivazhagan/fork-join-springboot-angular/tree/master/api-gateway">api-gateway</a></td>
    <td>9500</td>
    <td>Zuul API Gateway</td>
  </tr>
  
</table>

## Compatability Matrix

clone the repository based on below maintained versions.

<table>
 <tr>
    <th style="text-align:left">Branch/Version</th>
    <th style="text-align:left">Angular</th> 
    <th style="text-align:left">Spring Boot</th>
    <th style="text-align:left">Spring Cloud</th>
  </tr>
  <tr>
    <td>master</td>
    <td>7.0.0</td>
    <td>2.1.2.RELEASE</td>
    <td>Greenwich.RELEASE</td>
  </tr>
  <tr>
    <td>v1.0</td>
    <td>5.0.2</td>
     <td>2.0.3.RELEASE</td>
    <td>Finchley.RELEASE</td>
  </tr>
  <tr>
    <td>v2.0</td>
    <td>6.0.0</td>
    <td>2.1.0.RELEASE</td>
    <td>Greenwich.RELEASE</td>
  </tr> 
  
</table>

## How to run the application ?

* Clone the repository

```
git clone https://github.com/BarathArivazhagan/fork-join-springboot-angular.git
```

* Execute below script to build all the applications

```
cd fork-join-springboot-angular
./build.sh
```
* On windows, navigate to each applications and perform maven/webpack build
```
cd fork-join-springboot-angular
cd api-gateway 
./mvnw clean package

cd bank-service
./mvnw clean package

cd user-service
./mvnw clean package

cd fork-join-demo

npm install
npm run build
```

* Start the applications

```
cd fork-join-springboot-angular
cd api-gateway 
./mvnw spring-boot:run

cd bank-service
./mvnw spring-boot:run

cd user-service
./mvnw spring-boot:run

cd fork-join-demo

npm run start
```

### Docker support

Take advantage of docker compose to quickly build and run applications as containers.

* Build docker images
```
docker-compose build
```

* Run the applications

```
docker-compose up
```

### Kubernetes Support

To deploy the applications as docker containers inside kubernetes cluster

```
$ git clone https://github.com/BarathArivazhagan/fork-join-springboot-angular.git && cd fork-join-springboot-angular
$ kubectl create -f k8s/fork-join-deployment-k8s.yaml

configmap/spring-config-map created
configmap/api-gateway-config-map created
deployment.apps/user-app created
deployment.apps/bank-app created
deployment.apps/fork-join-api-gateway created
deployment.apps/fork-join-demo-app created
service/fork-join-api-gateway created
service/bank-service created
service/user-service created
service/fork-join-ui created
```

### Openshift Support

To deploy the applications as docker containers in openshift cluster

[Katacoda Openshift Playground](https://www.katacoda.com/courses/openshift/playground)

```
$ git clone https://github.com/BarathArivazhagan/fork-join-springboot-angular.git && cd fork-join-springboot-angular
$ oc login  # login into a project
$ oc create -f openshift/fork-join-openshift-deployment.yaml

configmap "spring-config-map" created
configmap "api-gateway-config-map" created
deploymentconfig "user-service" created
deploymentconfig "bank-service" created
eploymentconfig "api-gateway" created
deploymentconfig "fork-join-angular" created
imagestream "bank-service" created
imagestream "user-service" created
imagestream "api-gateway" created
imagestream "fork-join-angular" created
service "api-gateway" created
service "bank-service" created
service "user-service" created
service "fork-join-angular" created
```
> Note: Angular app uses nginx to serve static files.
        To run nginx as non root user in openshift, use fork-join-demo/Dockerfile.openshift to build angular app.

### Openshift ARO setup

#### Create Projects
```
oc new-project dev --display-name="Dev"
oc new-project stage --display-name="Stage"
oc new-project cicd --display-name="CI/CD"
```
#### Grant Jenkins Access to Projects
```
oc policy add-role-to-group edit system:serviceaccounts:cicd -n dev
oc policy add-role-to-group edit system:serviceaccounts:cicd -n stage
```

To setup cicd project
```
$ oc project cicd
$ oc process -f https://raw.githubusercontent.com/siamaksade/openshift-cd-demo/ocp-4.3/cicd-template.yaml | oc create -f -
$ oc import-image postgresql:9.6 --from=postgres:9.6 --confirm -n openshift
$ oc import-image jenkins:2 --from=quay.io/openshift/origin-jenkins:latest --confirm -n openshift
$ oc import-image jenkins-agent-nodejs:latest --from=quay.io/openshift/origin-jenkins-agent-nodejs:latest --confirm -n cicd
$ oc import-image jenkins-agent-maven:latest --from=quay.io/openshift/origin-jenkins-agent-maven:latest --confirm -n cicd
$ oc import-image jenkins-agent-base:latest --from=quay.io/openshift/origin-jenkins-agent-base:latest --confirm -n cicd
$ oc apply -f jenkins-configMaps.yaml
Note: Use Jenkins image that is imported above and create a deployment using that image and change the route that is created by default to use port 8080 instead of 50000
username is admin and password - password when using jenkins image from quay.io
Modify the route of Jenkins if the host does not work on browser
```

To setup Dev and Stage application
```
install git
git clone https://github.com/parkarteam/fork-join-springboot-angular.git && cd fork-join-springboot-angular
$ oc login  # login into a project
$ oc project dev
$ oc create -f openshift/fork-join-openshift-deployment.yaml
$ oc project stage
$ oc create -f openshift/fork-join-openshift-deployment.yaml
$ oc import-image bank-service:dev --from=ravirajk1007/fork-join-springboot-angular_bank-service:latest --confirm -n dev
$ oc import-image user-service:dev --from=ravirajk1007/fork-join-springboot-angular_user-service:latest --confirm -n dev
```
Change the deployment config to use the image build by pipeline for angular app i.e. ui-build:latest
Modify the image used in the deployment config for bank service app to use image bank-service:dev in openshift
Modify the image used in the deployment config for user service app to use image user-service:dev

To setup Jenkins build pipeline, execute the below command on cicd project

oc apply -f build-pipeline.yaml

To setup PVC

create a file share in Azure and apply storageclass, secret, pv and pvc and mount it to the desired application.

## Teardown openshift resources

To delete all the resources created in openshift

```
$ oc delete dc --all && oc delete svc --all && oc delete configmaps --all
```
