//SPDX-License-Identifier: UNLINCENSED
pragma solidity ^0.8.20;

contract Subscription {
  uint public nextPlanId;
  struct Plan {
    address artist;
    uint amount;
    uint frequency;
  }
  struct SubscriptionPlan {
    address subscriber;
    uint start;
    uint nextPayment;
  }
  mapping(uint => Plan) public plans;
  mapping(address => mapping(uint => SubscriptionPlan)) public subscriptions;

  event PlanCreated(
    address artist,
    uint planId,
    uint date
  );
  event SubscriptionCreated(
    address subscriber,
    uint planId,
    uint date
  );
  event SubscriptionCancelled(
    address subscriber,
    uint planId,
    uint date
  );
  event PaymentSent(
    address from,
    address to,
    uint amount,
    uint planId,
    uint date
  );

  function createPlan( uint amount) external {
    require(amount > 0, "amount needs to be > 0");
      plans[nextPlanId] = Plan(
      msg.sender, 
      amount, 
     30 days
    );
    nextPlanId++;
  }

  function subscribe(uint planId) external payable {
    Plan storage plan = plans[planId];
    require(plan.artist != address(0), "this plan does not exist");
    payable(plan.artist).transfer(plan.amount);
    emit PaymentSent(
      msg.sender, 
      plan.artist, 
      plan.amount, 
      planId, 
      block.timestamp
    );

    subscriptions[msg.sender][planId] = SubscriptionPlan(
      msg.sender, 
      block.timestamp, 
      block.timestamp + plan.frequency
    );
    emit SubscriptionCreated(msg.sender, planId, block.timestamp);
  }

  function cancel(uint planId) external {
    SubscriptionPlan storage subscriptionplan = subscriptions[msg.sender][planId];
    require(
      subscriptionplan.subscriber != address(0), 
      "subscriptionplan does not exist"
    );
    delete subscriptions[msg.sender][planId]; 
    emit SubscriptionCancelled(msg.sender, planId, block.timestamp);
  }

  function pay(address subscriber, uint planId) external payable {
    SubscriptionPlan storage subscriptionplan = subscriptions[subscriber][planId];
    Plan storage plan = plans[planId];
    require(
      subscriptionplan.subscriber != address(0), 
      "subscriptionplan does not exist"
    );
    require(
      block.timestamp > subscriptionplan.nextPayment,
      "not due yet"
    );
    payable(plan.artist).transfer(plan.amount);
    emit PaymentSent(
      subscriber,
      plan.artist, 
      plan.amount, 
      planId, 
      block.timestamp
    );
    subscriptionplan.nextPayment = subscriptionplan.nextPayment + plan.frequency;
  }
}